const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class FridgeIngredient extends Model { }

FridgeIngredient.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        fridge_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'fridge',
                key: 'id',
            }
        },
        ingredient_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'ingredient',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'fridge_ingredient',
    }
)

module.exports = FridgeIngredient;