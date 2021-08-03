const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// Still really confused on which attributes to include
class Recipe extends Model {
  static upvote(body, models) {
    return models.Vote.create({
      user_id: body.user_id,
      recipe_id: body.recipe_id,
    }).the(() => {
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
              "(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)"
            ),
            "vote_count",
          ],
        ],
      });
    });
  }
}

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
      type: DataTypes.STRING,
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

module.exports = Recipe;
