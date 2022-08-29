// import models
const Fridge = require('./Fridge');
const User = require('./User');
const Ingredient = require('./Ingredient');
const Recipe = require('./Recipe');

 User.hasOne(Fridge, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

 Fridge.belongsTo(User, {
    foreignKey: 'user_id'
});

 Fridge.hasMany(Ingredient, {
    foreignKey: 'ingredient_id'
});

 Ingredient.belongsTo(Fridge, {
    foreignKey: 'ingredient_id'
});

 Recipe.hasMany(Ingredient, {
    foreignKey: 'ingredient_id'
});

 Ingredient.belongsTo(Recipe, {
    foreignKey: 'ingredient_id'
});

 module.exports = { User, Fridge, Ingredient, Recipe }; 
