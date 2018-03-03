async function populateRecipes(){
  const query = document.getElementById('recipe-search-query').value;
  const data = (query) ? await getRecipes(query) : await getRecipes();
  const recipes = data.recipes;
  const currentPage = data.page;
  const maxPages = data.pageCount;

  const page_previous = document.getElementById('page_previous');
  const page_next = document.getElementById('page_next');

  page_previous.href = '#' + (currentPage - 1);
  page_next.href = '#' + (currentPage + 1);

  window.pageNo.textContent = `${currentPage}/${maxPages}`

  if (recipes.length == 0) {
    window.recipe_cards.innerHTML = 'No recipes';
    return;
  }

  window.recipe_cards.innerHTML = '';
  recipes.forEach((recipe) => {
    const prefab = window.template_card.content.cloneNode(true);

    const title = prefab.querySelector('#recipe_name');
    title.textContent = recipe.recipe_name;

    const description = prefab.querySelector('#recipe_description');
    description.textContent = recipe.recipe_description;

    const prep = prefab.querySelector('#recipe_time');
    prep.textContent = recipe.recipe_prep_time + recipe.recipe_cook_time;

    const feeds = prefab.querySelector('#recipe_feed');
    feeds.textContent = recipe.recipe_feeds;

    window.recipe_cards.appendChild(prefab);
  });

}

async function getRecipes(searchQuery){
  let url = '/data/recipes';
  url += '?p=' + encodeURIComponent(getCurrentPageNumber());

  if (searchQuery) {
    url += '&search=' + searchQuery;
  }
  const response = await fetch(url);
  if (!response.ok) {
    alert('error');
    return;
  }
  return await response.json();
}

function getCurrentPageNumber() {
  if (window.location.hash === '' || window.location.hash == null) return 1;

  let page = window.location.hash.substring(1);
  if (Number.isNaN(page)) page = 1;

  return page;
}

async function init(){
  populateRecipes();
  window.addEventListener('hashchange', populateRecipes);
  document.getElementById('recipe-search').addEventListener('click', () => {
    window.location.hash = '#1';
    populateRecipes();
  });

}

window.addEventListener('load', init);
