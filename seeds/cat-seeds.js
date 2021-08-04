const sequelize = require('../config/connection');
const { Category } = require('../models');

const catdata = [
    {
        category_name: 'Entree'
    },
    {
        category_name: 'Dessert'
    },
    {
        category_name: 'Drinks'
    }
]

const seedCategory = () => Category.bulkCreate(catdata);

module.exports = seedCategory;