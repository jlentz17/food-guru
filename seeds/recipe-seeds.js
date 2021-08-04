const { Recipe } = require('../models');

const recipedata = [
    {
        title: "Skillet Potatoes",
        ingredients: ["bell pepper", "potatoes", "onion", "butter"],
        recipe_content: "First melt 1 tbsp of butter on skillet. Then add diced potatoes and chopped vegetables. Cover and let cook, stirring occasionally. ",
        user_id: 2,
        category_id: 1
    }
];

const seedRecipes = () => Recipe.bulkCreate(recipedata);

module.exports = seedRecipes;