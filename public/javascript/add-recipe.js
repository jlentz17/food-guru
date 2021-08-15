async function newFormHandler(event) {
  event.preventDefault();
  console.log(event)
  const title = document.querySelector('input[name="recipe-title"]').value;
  const ingredients = document.querySelector(
    'input[name="recipe-ingredients"]'
  ).value;
  const category_id = document.querySelector('input[name="category"]').value;
  const recipe_content = document.querySelector(
    'input[name="recipe-content"]'
  ).value;

  console.log(category_id);

  const response = await fetch("/api/recipes", {
    method: "POST",
    body: JSON.stringify({
      title,
      ingredients,
      recipe_content,
      category_id
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
}

document.querySelector("#newRecipe").addEventListener("submit", newFormHandler);