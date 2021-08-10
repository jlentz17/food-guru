const { Comment } = require('../models');

const commentData = [
    {
        comment_text: "This is a great comment!",
        user_id: 1,
        recipe_id: 1
    },
    {
        comment_text: "This is an even greater comment",
        user_id: 2,
        recipe_id: 2
    },
    {
        comment_text: "This one is the best comment",
        user_id: 3,
        recipe_id: 3
    },

];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;