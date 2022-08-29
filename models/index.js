// import models
const Fridge = require('./Fridge');
const User = require('./User');
const Ingredient = require('./Ingredient');
const Recipe = require('./Recipe');
const RecipeIngredient = require('./RecipeIngredient');

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

// Recipe belongsToMany Ingredients (through RecipeIngredient)
 Recipe.belongsToMany(Ingredient, {
    through: {
        model: RecipeIngredient,
        unique: false
    },
    as: 'ingredients'
});

 Ingredient.belongsToMany(Recipe, {
    through: {
        model: RecipeIngredient,
        unique: false
    },
    as: 'recipes'
});

 module.exports = { User, Fridge, Ingredient, Recipe, RecipeIngredient }; 
