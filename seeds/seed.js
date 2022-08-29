const sequelize = require('../config/connection');
const {Fridge, Ingredient, Recipe, User, RecipeIngredient} = require('../models');

const fridgeData = require('./fridgeData.json');
const ingredientData = require('./ingredientData.json');
const recipeData = require('./recipeData.json');
const userData = require('./userData.json');
const recipeIngredientData = require('./recipeIngredientData.json');

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

    process.exit(0);
}

seedDatabase();
