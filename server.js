const express = require('express');
const app = express();

const fs = require('fs');
const config = require('./config');

const PORT = process.env.PORT || 8080;

const db = require('./database/database-model-sql');

app.use('/', express.static('static'));

//API
//  GET     /data/recipes                   - Return a list of max 10 recipes given the page in JSON format.
//  GET     /recipe.html/data/recipes/:id   - Return a single recipe given the :id
//  GET     /data/recipes/getUnits          - Returns all units that are used by ingredients
//  GET     /data/method/:id                - Returns all steps of method given the :id
//  GET     /data/ingredients/:id           - Returns all ingredients for a given recipe :id

app.get('/data/recipes', sendRecipes);
app.get('/recipe.html/data/recipes/:id', getRecipe);
app.get('/data/recipes/units', getPossibleUnits);
app.get('/data/method/:id', getMethod);
app.get('/data/ingredients/:id', getIngredients);

app.listen(PORT, async (err) => {
  if (err) console.error(err);
  else {
    console.log(`Server running on PORT: ${PORT}`);
    //Make the images folder if it doesnt already exist, ready to contain sent images.
    if (!fs.existsSync(config.clientimgpath)){
      fs.mkdirSync(config.clientimgpath);
    }
  }
});

async function getPossibleUnits(req, res){
  const data = await db.getUnits();
  const units = [];
  data.forEach((unitData) => {
    units.push(unitData.ingredient_unit);
  });
  res.json(units);
}

async function getRecipe(req, res) {
  const recipeID = req.params.id;
  const recipe = await db.getRecipe(recipeID);
  res.json(recipe);
}

async function getMethod(req, res){
  const recipeID = req.params.id;
  const recipe = await db.getMethod(recipeID);
  res.json(recipe);
}

async function getIngredients(req, res){
  const recipeID = req.params.id;
  const recipe = await db.getIngredients(recipeID);
  res.json(recipe);
}

//Server functions
const RECIPE_LIMIT = 10;
async function sendRecipes(req, res){

  //Determine what recipes has been requested.
  let recipeList;
  if (req.query.search && req.query.filter) {
    recipeList = await db.searchAndFilterRecipes(req.query.search, req.query.filter);
  } else if (req.query.search) {
    recipeList = await db.searchRecipes(req.query.search);
  } else if (req.query.filter) {
    recipeList = await db.filterRecipes(req.query.filter);
  } else {
    recipeList = await db.getRecipes();
  }

  let page = Number(req.query.p) || 1;
  //How many pages of recipes are possible?
  const pageCount = Math.ceil(recipeList.length / RECIPE_LIMIT);
  if (page > pageCount) page = pageCount;

  let recipes = recipeList.slice(RECIPE_LIMIT * (page - 1), RECIPE_LIMIT * page);
  moveImages(recipes);
  res.send({
    recipes,
    page,
    pageCount
  });
}

function arrayToJson(array){
  let json;
  for (let i = 0; i < array.length; i++){
    console.log(array[i]);
  }
  return [];
}

function moveImages(recipes){
  //Delete/refresh clients images
  fs.readdir(config.clientimgpath, (err, items) => {
    if (err) console.error(err);
    for (let i = 0; i < items.length; i++){
      let file = items[i];
      fs.unlink(config.clientimgpath + file, (err) => {
        if (err) console.error(err);
      });
    }
  });

  //Add images that client needs to use
  for (let i = 0; i < recipes.length; i++) {
    let recipe = recipes[i];
    fs.exists(config.serverimgpath + recipe.recipe_img_name, (exists) => {
      if (exists) {
        //Copy and paste images from server database to folder accessible from client.
        fs.createReadStream(config.serverimgpath + recipe.recipe_img_name).pipe(fs.createWriteStream(config.clientimgpath + recipe.recipe_img_name));
      }
    });
  }
}
