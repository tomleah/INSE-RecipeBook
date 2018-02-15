async function populateRecipes(){
  const data = await getRecipes();
  const recipes = data.recipes;
  const currentPage = data.page;
  const maxPages = data.pageCount;

  const page_previous = document.getElementById('page_previous');
  const page_next = document.getElementById('page_next');

  page_previous.href = '#' + (currentPage - 1);
  page_next.href = '#' + (currentPage + 1);

  window.recipe_cards.innerHTML = '';
  recipes.forEach((recipe) => {
    const prefab = window.template_card.content.cloneNode(true);

    const title = prefab.querySelector('#recipe_name');
    title.textContent = `[${recipe.recipe_id}] ${recipe.recipe_name}`;

    const description = prefab.querySelector('#recipe_description');
    description.textContent = recipe.recipe_description;
    //
    const prep = prefab.querySelector('#recipe_time');
    prep.textContent = recipe.recipe_prep_time + recipe.recipe_cook_time;

    const feeds = prefab.querySelector('#recipe_feed');
    feeds.textContent = recipe.recipe_feeds;

    window.recipe_cards.appendChild(prefab);
  });

  window.pageNo.textContent = `${currentPage}/${maxPages}`
}

async function getRecipes(){
  const url = '/data/recipes?p=' + encodeURIComponent(getCurrentPageNumber());
  const response = await fetch(url);
  if (!response.ok) {
    alert('error');
    return;
  }
  const recipes = await response.json();
  return recipes;
}

function getCurrentPageNumber() {
  if (window.location.hash === '' || window.location.hash == null) return 1;

  let page = + window.location.hash.substring(1);
  if (Number.isNaN(page)) page = 1;

  return page;
}

function init(){
  populateRecipes();
  window.addEventListener('hashchange', populateRecipes);
}

window.addEventListener('load', init);
