const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// Create a method to call this for upvote logic
class Recipe extends Model {
  static upvote(body, models) {
    return models.Vote.create({
      user_id: body.user_id,
      recipe_id: body.recipe_id,
    }).then(() => {
      return Recipe.findOne({
        where: {
          id: body.recipe_id,
        },
        attributes: [
          "id",
          "title",
          "ingredients",
          "recipe_content",
          "created_at",
          [
            sequelize.literal(
              "(SELECT COUNT(*) FROM vote WHERE recipe.id = vote.recipe_id)"
            ),
            "vote_count"
          ],
        ],
        include: [
          {
            model: models.Comment,
            attributes: [
              "id",
              "comment_text",
              "recipe_id",
              "user_id",
              "created_at",
            ],
            include: {
              model: models.User,
              attributes: ["username"],
            },
          },
        ],
      });
    });
  }
}

// Set up table and properties/attributes
Recipe.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ingredients: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    recipe_content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "recipe",
  }
);

// Export
module.exports = Recipe;
