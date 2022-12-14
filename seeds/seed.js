const sequelize = require('../config/connection');
const {Fridge, Ingredient, Recipe, User, RecipeIngredient, FridgeIngredient} = require('../models');

const fridgeData = require('./fridgeData.json');
const ingredientData = require('./ingredientData.json');
const recipeData = require('./recipeData.json');
const userData = require('./userData.json');
const recipeIngredientData = require('./recipeIngredientData.json');
const fridgeIngredientData = require('./fridgeIngredientData.json')

const seedDatabase = async () => {
    await sequelize.sync({ force: true});

    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    await Ingredient.bulkCreate(ingredientData);

    await Fridge.bulkCreate(fridgeData);

    await Recipe.bulkCreate(recipeData);

    await RecipeIngredient.bulkCreate(recipeIngredientData);

    await FridgeIngredient.bulkCreate(fridgeIngredientData);

    process.exit(0);
}

seedDatabase();
