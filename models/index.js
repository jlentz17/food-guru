const User = require("./User");
const Recipe = require("./Recipe")
const Vote = require("./Vote")

User.hasMany(Recipe, {
    foreignKey: "user_id"
})

Recipe.belongsTo(User, {
    foreignKey: "user_id"
})

User.belongsToMany(Recipe, {
    through: Vote,
    as: "voted_recipe",
    foreignKey: "user_id"
})

Recipe.belongsToMany(User, {
    through: Vote,
    as: "voted_recipe",
    foreignKey: "recipe_id"
})

Vote.belongsTo(User, {
    foreignKey: "user_id"
})

Vote.belongsTo(Recipe, {
    foreignKey: "recipe_id"
})

User.hasMany(Vote, {
    foreignKey: "user_id"
})

Recipe.hasMany(Vote, {
    foreignKey: "recipe_id"
})

module.exports = { User, Recipe, Vote };