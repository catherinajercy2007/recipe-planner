const ingredientInput = document.getElementById("ingredientInput");
const quantityInput = document.getElementById("quantityInput");
const pantryList = document.getElementById("pantryList");

const recipeNameInput = document.getElementById("recipeNameInput");
const recipeIngredientsInput = document.getElementById("recipeIngredientsInput");
const recipeList = document.getElementById("recipeList");

let pantry = JSON.parse(localStorage.getItem("pantry")) || [];
let recipes = JSON.parse(localStorage.getItem("recipes")) || [];

function saveData() {
  localStorage.setItem("pantry", JSON.stringify(pantry));
  localStorage.setItem("recipes", JSON.stringify(recipes));
}

function addIngredient() {
  const name = ingredientInput.value.trim().toLowerCase();
  const qty = quantityInput.value.trim();

  if (!name || !qty) return;

  pantry.push({ name, qty });
  ingredientInput.value = "";
  quantityInput.value = "";

  saveData();
  renderPantry();
  renderRecipes();
}

function renderPantry() {
  pantryList.innerHTML = "";

  pantry.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} (${item.qty})
      <button onclick="removeIngredient(${index})">❌</button>
    `;
    pantryList.appendChild(li);
  });
}

function removeIngredient(index) {
  pantry.splice(index, 1);
  saveData();
  renderPantry();
  renderRecipes();
}

function addRecipe() {
  const name = recipeNameInput.value.trim();
  const ingredients = recipeIngredientsInput.value
    .split(",")
    .map(i => i.trim().toLowerCase())
    .filter(i => i !== "");

  if (!name || ingredients.length === 0) return;

  recipes.push({ name, ingredients });
  recipeNameInput.value = "";
  recipeIngredientsInput.value = "";

  saveData();
  renderRecipes();
}

function renderRecipes() {
  recipeList.innerHTML = "";

  recipes.forEach(recipe => {
    const pantryItems = pantry.map(p => p.name);
    const missing = recipe.ingredients.filter(
      ing => !pantryItems.includes(ing)
    );

    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${recipe.name}</strong><br>
      ${
        missing.length === 0
          ? '<span class="status-ok">You can cook this ✔</span>'
          : `<span class="status-missing">Missing: ${missing.join(", ")}</span>`
      }
    `;
    recipeList.appendChild(li);
  });
}

renderPantry();
renderRecipes();
