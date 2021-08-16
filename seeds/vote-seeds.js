const { Vote } = require('../models');

const votedata = [
    {
        user_id: 1,
        recipe_id: 1
    },
    {
        user_id: 3,
        recipe_id: 1
    }
];

const seedVotes = () => Vote.bulkCreate(votedata);

module.exports = seedVotes;