window.addEventListener('load', init);

function init(){
  const params = new URLSearchParams(document.location.search.substring(1));
  const recipeID = params.get("recipe");
  populatePage(recipeID);
}

async function populatePage(recipeID) {
  let response;

  response = await fetch('recipe.html/data/recipes/' + recipeID);
  if (!response.ok) {
    return;
  }
  const recipe = await response.json();

  response = await fetch('/data/method/' + recipeID);
  if (!response.ok) {
    return;
  }
  const methods = await response.json();

  response = await fetch('/data/ingredients/' + recipeID);
  if (!response.ok) {
    return;
  }
  const ingredients = await response.json();
  
  document.querySelector('main').innerHTML = '';
  const prefab = document.getElementById('recipe-template').content.cloneNode(true);

  const title = prefab.getElementById('recipe-title');
  title.textContent = recipe.recipe_name;

  const desc = prefab.getElementById('recipe-desc');
  desc.textContent = recipe.recipe_description;

  const feeds = prefab.getElementById('recipe-feeds');
  feeds.textContent = recipe.recipe_feeds;

  const prepare = prefab.getElementById('recipe-prepare');
  prepare.textContent = recipe.recipe_prep_time;

  const cook = prefab.getElementById('recipe-cook');
  cook.textContent = recipe.recipe_cook_time;

  const methodList = prefab.getElementById('recipe-method');
  methods.forEach((method) => {
    const li = document.createElement('li');
    li.textContent = method.method_instr;
    methodList.appendChild(li);
  });

  const ingredientsList = prefab.getElementById('recipe-ingredients');
  ingredients.forEach((ingredient) => {
    const li = document.createElement('li');
    if (ingredient.recipeIngredients_quantity != null) {
      li.textContent += ingredient.recipeIngredients_quantity;
    }
    if (ingredient.ingredient_unit != null) {
      li.textContent += ingredient.ingredient_unit;
    }
    li.textContent += ' ' + ingredient.ingredient_name;
    ingredientsList.appendChild(li);
  });

  document.querySelector('main').appendChild(prefab);

}
