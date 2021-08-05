const User = require("./User");
const Recipe = require("./Recipe");
const Vote = require("./Vote");
const Category = require("./Category");
// const Ingredient = require("./Ingredient");

User.hasMany(Recipe, {
  foreignKey: "user_id",
});

Recipe.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "SET NULL"
});

User.belongsToMany(Recipe, {
  through: Vote,
  as: "voted_recipes",
  foreignKey: "user_id",
  onDelete: "SET NULL"
});

Recipe.belongsToMany(User, {
  through: Vote,
  as: "voted_recipes",
  foreignKey: "recipe_id",
  onDelete: "SET NULL"
});
// Category.belongsToMany(Recipe, {
//   through: Recipe,
//   as: "category",
//   foreignKey: "category_id",
//   onDelete: "SET NULL"
// });

// Recipe.belongsToMany(Category, {
//   through: Recipe,
//   as: "category",
//   foreignKey: "recipe_id",
//   onDelete: "SET NULL"
// });

Vote.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "SET NULL"
});

Vote.belongsTo(Recipe, {
  foreignKey: "recipe_id",
  onDelete: "SET NULL"
});

User.hasMany(Vote, {
  foreignKey: "user_id",
});

Recipe.hasMany(Vote, {
  foreignKey: "recipe_id",
});


// Recipe.hasMany(Category, {
//     foreignKey: "recipe_id"
// })

// Category.hasMany(Recipe, {
//     foreignKey: "category_id"
// })




Category.belongsTo(Recipe, {
  foreignKey: "recipe_id",
  onDelete: "SET NULL"
});


Recipe.hasMany(Category, {
  foreignKey: "recipe_id",
  onDelete: "SET NULL"
});



module.exports = { User, Recipe, Vote, Category };
