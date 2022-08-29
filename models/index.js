// import models
const Fridge = require('./Fridge');
const User = require('./User');
const Ingredient = require('./Ingredient');
const Recipe = require('./Recipe');
const RecipeIngredient = require('./RecipeIngredient');
const FridgeIngredient = require('./FridgeIngredient');

 User.hasOne(Fridge, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

 Fridge.belongsTo(User, {
    foreignKey: 'user_id'
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

// Fridge belongsToMany Ingredients (through FridgeIngredient)
Fridge.belongsToMany(Ingredient, {
    through: {
        model: FridgeIngredient,
        unique: false
    },
    as: 'stocks'
});

 Ingredient.belongsToMany(Fridge, {
    through: {
        model: FridgeIngredient,
        unique: false
    },
    as: 'fridges'
});

 module.exports = { User, Fridge, Ingredient, Recipe, RecipeIngredient, FridgeIngredient }; 
