'use strict';

const mysql = require('mysql2/promise');

const config = require('../config');

module.exports.getRecipe = async (recipeID) => {
  const sql = await init();

  const query = sql.format('SELECT * FROM Recipes WHERE recipe_id = ?', recipeID);
  const [rows] = await sql.query(query);
  return rows[0];
}

module.exports.getRecipes = async () => {
  const sql = await init();

  const query = sql.format('SELECT * FROM Recipes');
  const [rows] = await sql.query(query);
  return rows;
}

module.exports.searchAndFilterRecipes = async (search, filters) => {
  const filtered = await module.exports.filterRecipes(filters);
  const searched = await module.exports.searchRecipes(search);
  let recipes = [];
  for (let i = 0; i < filtered.length; i++){
    for (let j = 0; j < searched.length; j++){
      if (filtered[i].recipe_id == searched[j].recipe_id) {
        if (!isRecipeIncluded(filtered[i], recipes)) {
          recipes.push(filtered[i]);
        }
      }
    }
  }
  return recipes;
}

module.exports.filterRecipes = async (filters) => {
  let recipes = [];
  for (let i = 0; i < filters.length; i++){
    const filter = JSON.parse(filters[i]);
    const ingredients = await module.exports.searchIngredients(filter.name);
    for (let j = 0; j < ingredients.length; j++){
      const ingredient = ingredients[j];
      if (ingredient.ingredient_unit == null) ingredient.ingredient_unit = 'null';
      if (filter.name == ingredient.ingredient_name && ingredient.recipeIngredients_quantity <= filter.quantity && ingredient.ingredient_unit == filter.unit){
        const recipe = await module.exports.getRecipe(ingredient.recipe_id);
        if (!isRecipeIncluded(recipe, recipes)) {
          recipes.push(recipe);
        }
      }
    }
  }
  console.log(recipes);
  return recipes;
}

module.exports.searchRecipes = async (search) => {
  const sql = await init();

  const filter = '%' + search + '%';

  const query = sql.format('SELECT * FROM Recipes WHERE recipe_name LIKE ?', filter);
  const [rows] = await sql.query(query);
  return rows;
}

module.exports.getMethod = async (recipeID) => {
  const sql = await init();

  const query = sql.format('SELECT * FROM RecipeMethod WHERE recipe_id = ?', recipeID);
  const [rows] = await sql.query(query);
  return rows;
}

module.exports.searchIngredients = async (search) => {
  const sql = await init();

  const filter = '%' + search + '%';

  const query = sql.format('SELECT RecipeIngredients.recipe_id, Ingredient.ingredient_name, RecipeIngredients.recipeIngredients_quantity, Ingredient.ingredient_unit FROM RecipeIngredients INNER JOIN Ingredient ON RecipeIngredients.ingredient_id = Ingredient.ingredient_id WHERE Ingredient.ingredient_name LIKE ?', filter);
  const [rows] = await sql.query(query);
  return rows;
}

module.exports.getIngredients = async (recipeID) => {
  const sql = await init();

  const query = sql.format('SELECT Ingredient.ingredient_name, RecipeIngredients.recipeIngredients_quantity, Ingredient.ingredient_unit FROM RecipeIngredients INNER JOIN Ingredient ON RecipeIngredients.ingredient_id = Ingredient.ingredient_id WHERE RecipeIngredients.recipe_id = ?', recipeID);
  const [rows] = await sql.query(query);
  return rows;
}

module.exports.getUnits = async () => {
  const sql = await init();

  const query = sql.format('SELECT ingredient_unit, min(ingredient_id) FROM Ingredient GROUP BY ingredient_unit');
  const [rows] = await sql.query(query);
  return rows;

}

function isRecipeIncluded(recipe, list) {
  for (let i = 0; i < list.length; i++){
    if (recipe.recipe_id == list[i].recipe_id) return true;
  }
  return false;
}

let sqlPromise = null;

async function init() {
  if (sqlPromise) return sqlPromise;

  sqlPromise = newConnection();
  return sqlPromise;
}

async function newConnection() {
  const sql = await mysql.createConnection(config.mysql);

  sql.on('error', (err) => {
    console.error(err);
    sql.end();
  });

  return sql;
}
