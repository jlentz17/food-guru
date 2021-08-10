async function editFormHandler(event) {
  event.preventDefault();

  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  const response = await fetch(`/api/recipe/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      title
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
}


document.querySelector(".edit-recipe-form")
  .addEventListener("submit", editFormHandler);
