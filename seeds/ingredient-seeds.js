const { Ingredient } = require('../models');


const ingredientdata = [
    {
        ingredient_name: "bell pepper",
        recipe_id: 1
    },
    {
        ingredient_name: "potatoes",
        recipe_id: 1
    },
    {
        ingredient_name: "butter",
        recipe_id: 1
    },
    {
        ingredient_name: "onion",
        recipe_id: 1
    }
];

const seedIngredients = () => Ingredient.bulkCreate(ingredientdata);

module.exports = seedIngredients;