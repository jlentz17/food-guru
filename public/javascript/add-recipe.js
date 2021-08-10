async function newFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="recipe-title"]').value;
    const ingredients = document.querySelector('input[name="recipe-ingredients"]').value;
    const recipe_content = document.querySelector('input[name="recipe-content"]').value;
  
    const response = await fetch(`/api/recipes`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        ingredients,
        recipe_content
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.newRecipe').addEventListener('submit', newFormHandler)