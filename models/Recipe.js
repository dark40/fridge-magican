const { Model, DataTypes } = require('sequelize');
 const sequelize = require('../config/connection');

 class Recipe extends Model { }

 Recipe.init(
     {
         id: {
             type: DataTypes.INTEGER,
             allowNull: false,
             primaryKey: true,
             autoIncrement: true,
         },
         name: {
             type: DataTypes.STRING,
             allowNull: false,
         },
         description: {
             type: DataTypes.STRING,
             allowNull: false,
         },
         instruction: {
             type: DataTypes.STRING,
             allowNull: false,
         },
         ingredient_id: {
             type: DataTypes.INTEGER,
             references: {
                 model: 'ingredient',
                 key: 'id',
             },
         },
         time: {
             type: DataTypes.INTEGER,
             allowNull: false,
           },
         calories: {
             type: DataTypes.INTEGER,
             allowNull: false,
           },
         difficulty: {
             type: DataTypes.ENUM('Easy', 'Medium', 'Hard'),
             allowNull: false,
           },
     },
     {
         sequelize,
         timestamps: false,
         freezeTableName: true,
         underscored: true,
         modelName: 'recipe',
     }
 )

 module.exports = Recipe;