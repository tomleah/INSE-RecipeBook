async function loadRecipes(){
  const response = await fetch('/data/recipes');
  if (!response.ok) {
    alert('error');
    console.log(response.status);
    return;
  }
  const data = await response.json();
  console.log(data);
  return false;
}

window.addEventListener('load', loadRecipes);
