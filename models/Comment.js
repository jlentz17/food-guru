// Bring in DataTypes and Model and sequelize
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

// Set up table and properties/attributes
Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    comment_text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    recipe_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'recipe',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    
    freezeTableName: true,
    underscored: true,
    modelName: 'comment'
  }
);

// Export
module.exports = Comment;