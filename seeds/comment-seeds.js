const { Comment } = require('../models');

const commentData = [
    {
        comment_text: "This is a great comment!",
        user_id: 1,
        post_id: 1
    },
    {
        comment_text: "This is an even greater comment",
        user_id: 2,
        post_id: 2
    },
    {
        comment_text: "This one is the best comment",
        user_id: 3,
        post_id: 3
    },

];

const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment;