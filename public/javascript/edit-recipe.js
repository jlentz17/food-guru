async function editFormHandler(event) {
  event.preventDefault();
  const title = document.querySelector("#recipe-title").value;
  const content = document.querySelector("#recipe-content").value;
  const ingredients = document.querySelector("#recipe-ingredients").value;
  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  const response = await fetch(`/api/recipes/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      title,
      content,
      ingredients,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json()
  console.log(data)
  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector(".edit-recipe-form")
  .addEventListener("submit", editFormHandler);
