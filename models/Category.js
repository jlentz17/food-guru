const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Category extends Model {};

Category.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        category_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        recipe_id: {
            type: DataTypes.INTEGER,
            // allowNull: false? They don't have to add category to recipe if they don't want
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "category"
    }
)

module.exports = Category;