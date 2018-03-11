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

module.exports.getIngredients = async (recipeID) => {
  const sql = await init();

  const query = sql.format('SELECT Ingredient.ingredient_name, RecipeIngredients.recipeIngredients_quantity, Ingredient.ingredient_unit FROM RecipeIngredients INNER JOIN Ingredient ON RecipeIngredients.ingredient_id = Ingredient.ingredient_id WHERE RecipeIngredients.recipe_id = ?', recipeID);
  const [rows] = await sql.query(query);
  return rows;
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
