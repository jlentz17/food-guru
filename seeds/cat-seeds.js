const { Category } = require('../models');

const catdata = [
    {
        category_name: 'Entree'
    },
    {
        category_name: 'Drinks'
    },
    {
        category_name: 'Dessert'
    }
];

const seedCategory = () => Category.bulkCreate(catdata);

module.exports = seedCategory;