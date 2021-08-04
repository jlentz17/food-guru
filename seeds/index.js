const seedUser = require('./user-seeds');
const seedCategory = require('./cat-seeds');


const sequelize = require('../config/connection');


const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('--------------');

    await seedUser();
    console.log('--------------');

    await seedCategory();
    console.log('--------------');


    process.exit(0)
};

seedAll();