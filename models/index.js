// Bring in all the models
const User = require("./User");
const Recipe = require("./Recipe");
const Vote = require("./Vote");
const Category = require("./Category");
const Comment = require("./Comment")

// Set up associations between tables
User.hasMany(Recipe, {
  foreignKey: "user_id",
});

Recipe.belongsTo(User, {
  foreignKey: "user_id",
  // onDelete: "SET NULL",
});

User.belongsToMany(Recipe, {
  through: Vote,
  as: "voted_recipes",
  foreignKey: "user_id",
});

Recipe.belongsToMany(User, {
  through: Vote,
  as: "voted_recipes",
  foreignKey: "recipe_id",
});

Vote.belongsTo(User, {
  foreignKey: "user_id",
  // onDelete: "SET NULL",
});

Vote.belongsTo(Recipe, {
  foreignKey: "recipe_id",
  // onDelete: "SET NULL",
});

User.hasMany(Vote, {
  foreignKey: "user_id",
});

Recipe.hasMany(Vote, {
  foreignKey: "recipe_id",
});


Comment.belongsTo(User, {
  foreign_key: "user_id"
})

Comment.belongsTo(Recipe, {
  foreignKey: "recipe_id"
})

User.hasMany(Comment, {
  foreignKey: "user_id"
})

Recipe.hasMany(Comment, {
  forign_key: "recipe_id"
})

// Category.belongsTo(Recipe, {
//   foreignKey: "recipe_id",
//   // onDelete: "SET NULL",
// });

// Recipe.hasMany(Category, {
//   foreignKey: "recipe_id",
//   // onDelete: "SET NULL",
// });

// Export all models
module.exports = { User, Recipe, Vote, Category, Comment};
// module.exports = { User, Recipe, Vote, Comment};
