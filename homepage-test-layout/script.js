const appId = "efc3cb76";
const appKey = "d69657e7b41e6993c2433338fe22db48";
const baseUrl = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${appId}&app_key=${appKey}`;
const recipeContainer = document.querySelector("#recipe-container");
const searchText = document.querySelector("#searchText");
const findBtn = document.querySelector(".btn");

findBtn.addEventListener("click", () => loadRecipes(searchText.value));

searchText.addEventListener("keyup", (e) => {
  const inputVal = searchText.value;
  if (e.keyCode === 13) {
    loadRecipes(inputVal);
  }
});

function loadRecipes(type = "chicken") {
  const url = baseUrl + `&q= ${type}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => renderRecipes(data.hits))
    .catch((error) => console.log(error));
}
loadRecipes();

const getRecipeSteps = (ingredientLines = []) => {
  let str = "";
  for (let step of ingredientLines) {
    str = str + `<li>${step}</li>`;
  }
  return str;
};

const renderRecipes = (recipeList = []) => {
  recipeContainer.innerHTML = "";
  recipeList.forEach((recipeObj) => {
    const {
      label: recipeTitle,
      ingredientLines,
      image: recipeImage,
    } = recipeObj.recipe;
    const recipeSteps = getRecipeSteps(ingredientLines);
    const htmlStr = `  <div class="recipe">
        <div class="recipe-title">${recipeTitle}</div>
        <div class="recipe-image">
            <img src="${recipeImage}" alt="Recipe">
        </div>
        <div class="recipe-text">
            <ul>
              ${recipeSteps}
            </ul>
        </div>
    </div>`;
    recipeContainer.insertAdjacentHTML("beforeend", htmlStr);
  });
};
