const express = require('express');
const app = express();

const fs = require('fs');
const config = require('./config');

const PORT = process.env.PORT || 8080;

const db = require('./database/database-model-sql');

app.use('/', express.static('static'));

//API
//  GET     /data/recipes           - Return a list of max 10 recipes given the page in JSON format.
//            ?p=...                - page number the client is requesting.
//            ?search=...           - recipe search query

app.get('/data/recipes', sendRecipes);

app.listen(PORT, async (err) => {
  if (err) console.error(err);
  else console.log(`Server running on PORT: ${PORT}`);
});

//Server functions
const RECIPE_LIMIT = 4;
async function sendRecipes(req, res){
  const recipeList = (req.query.search) ? await db.searchRecipes(req.query.search) : await db.getRecipes();
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

function moveImages(recipes){
  fs.readdir(config.clientimgpath, (err, items) => {
    items.forEach((file) => {
      fs.unlink(config.clientimgpath + file, (err) => {
        if (err) console.error(err);
      });
    });
  });

  recipes.forEach((recipe, index) => {
    fs.exists(config.serverimgpath + recipe.recipe_img_name, (exists) => {
      if (exists) {
        console.log(recipe.recipe_img_name + ' exists');
        fs.createReadStream(config.serverimgpath + recipe.recipe_img_name).pipe(fs.createWriteStream(config.clientimgpath + recipe.recipe_img_name));
      } else {
        console.log(recipe.recipe_img_name + ' doesn\'t exist');
      }
    });
  });
}
