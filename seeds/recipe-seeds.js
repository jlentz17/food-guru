const { Recipe } = require('../models');

const recipedata = [
    {
        title: "Skillet Potatoes",
        ingredients: "bell pepper, onion, potatoes, butte",
        recipe_content: "First melt 1 tbsp of butter on skillet. Then add diced potatoes and chopped vegetables. Cover and let cook, stirring occasionally. ",
        category_id: 1,
        user_id: 2
    },
    {
        title: "Tropical Margarita",
        ingredients: "tequila, margarita miz, pineapples, mangoes, kiwi, sugar",
        recipe_content: "blend ingredients together",
        category_id: 2,
        user_id: 1
    },
    {
        title: "Cinnamon Rolls",
        ingredients: "cinnamon, dough, powdered sugar",
        recipe_content: "Put in oven, then add powdered sugar",
        category_id: 3,
        user_id: 3
    }
];

const seedRecipes = () => Recipe.bulkCreate(recipedata);

module.exports = seedRecipes;