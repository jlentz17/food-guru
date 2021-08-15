const seedUser = require('./user-seeds');
const seedCategory = require('./cat-seeds');
const seedRecipes = require('./recipe-seeds');
const seedComments = require('./comment-seeds');
const seedVotes = require('./vote-seeds');



const sequelize = require('../config/connection');


const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('--------------');

    await seedUser();
    console.log('--------------');

    await seedCategory();
    console.log('--------------');

    await seedRecipes();
    console.log('--------------');
    
    await seedComments();
    console.log('--------------');

    await seedVotes();
    console.log('--------------');


    process.exit(0)
};

seedAll();