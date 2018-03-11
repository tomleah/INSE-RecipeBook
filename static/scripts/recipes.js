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
  recipes.forEach(async (recipe) => {
    const prefab = window.template_card.content.cloneNode(true);

    const card = prefab.querySelector('.card-wrapper');
    card.dataset.recipeID = recipe.recipe_id;
    card.addEventListener('click', (e) => {
      const recipeID = findPathElement('card-wrapper', e.path).dataset.recipeID;
      window.location.replace('recipe.html?recipe=' + recipeID);
    });

    const title = prefab.querySelector('#recipe_name');
    title.textContent = recipe.recipe_name;

    const description = prefab.querySelector('#recipe_description');
    description.textContent = recipe.recipe_description;

    const prep = prefab.querySelector('#recipe_time');
    prep.textContent = recipe.recipe_prep_time + recipe.recipe_cook_time;

    const feeds = prefab.querySelector('#recipe_feed');
    feeds.textContent = recipe.recipe_feeds;

    const img = prefab.querySelector('#recipe_image');
    const response = await fetch('images/cardcovers/' + recipe.recipe_img_name);
    if (!response.ok) {
      recipe.recipe_img_name = '../defaults/nocardcover.png';
    }
    img.src = 'images/cardcovers/' + recipe.recipe_img_name;

    window.recipe_cards.appendChild(prefab);
  });
}

function findPathElement(className, path) {
  path = path.slice(0, -2);
  let returnValue;
  path.some((el, index) => {
    if (el.classList.contains(className)) {
      returnValue = el;
      return;
    }
  });
  return returnValue;
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

let allFilters = [];
function addFilter(){
  const name = document.getElementById('filter-name').value;
  const quantity = Number(document.getElementById('filter-quantity').value);
  const unit = document.getElementById('unit-list').value;

  const filter = {
    name,
    quantity,
    unit
  }

  if (name == "" || isNaN(quantity) || quantity <= 0) {
    return;
  }

  const filtersList = document.getElementById('filter-list');
  const filterPrefab = document.getElementById('filter-option-template').content.cloneNode(true);
  let text = `${name} (${quantity}`;
  if (unit != 'null') {
    text += `${unit}`;
  }
  text += `)`;
  filterPrefab.getElementById('filter-option').textContent = text;
  filtersList.appendChild(filterPrefab);
  allFilters.push(filter);
}

async function populateUnitDropdown(){
  const response = await fetch('/data/recipes/units');
  if (!response.ok) {
    return;
  }
  const units = await response.json();

  const unitList = document.getElementById('unit-list');
  unitList.innerHTML = '';
  units.forEach((unit) => {
    const option = document.getElementById('unit-option-template').content.cloneNode(true);
    option.getElementById('unit-name').value = unit;
    option.getElementById('unit-name').textContent = unit;
    unitList.appendChild(option);
  });
}

async function init(){
  populateRecipes();
  window.addEventListener('hashchange', populateRecipes);
  document.getElementById('add-filter').addEventListener('click', addFilter);
  document.getElementById('new-filter').addEventListener('click', () => {
    document.getElementById('new-filter-form').classList.remove('hide');
    populateUnitDropdown();
  });
  document.getElementById('cancel-filter').addEventListener('click', () => {
    document.getElementById('new-filter-form').classList.add('hide');
  });
  document.getElementById('recipe-search').addEventListener('click', () => {
    window.location.hash = '#1';
    populateRecipes();
  });
}

window.addEventListener('load', init);
