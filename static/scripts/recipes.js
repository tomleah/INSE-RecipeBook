async function populateRecipes(){
  const recipes = await getRecipes();

  recipes.forEach((recipe) => {
    const prefab = window.template_card.content.cloneNode(true);

    const title = prefab.querySelector('#recipe_name');
    title.textContent = recipe.recipe_name;

    const description = prefab.querySelector('#recipe_description');
    description.textContent = recipe.recipe_description;
    //
    const prep = prefab.querySelector('#recipe_time');
    prep.textContent = recipe.recipe_prep_time + recipe.recipe_cook_time;

    window.recipe_cards.appendChild(prefab);
  });
}

async function getRecipes(){
  const response = await fetch('/data/recipes');
  if (!response.ok) {
    alert('error');
    console.log(response.status);
    return;
  }
  const recipes = await response.json();
  return recipes;
}

window.addEventListener('load', populateRecipes);
