const axios = require("axios");

async function deleteFormHandler(event) {
    event.preventDefault();
  
    const id = window.location.toString().split("/")[
      window.location.toString().split("/").length - 1
    ];
    const response = await axios.delete(`/api/recipes/${id}`, {
      // method: "DELETE",
    });
  
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
  
  document
    .querySelector(".delete-recipe-btn")
    .addEventListener("click", deleteFormHandler);
  