const { Fridge, Ingredient, Recipe, User, FridgeIngredient, RecipeIngredient} = require("../models");
const router = require("express").Router();
const withAuth = require("../utils/auth");

// Render homepage
router.get("/", async (req, res) => {
  try{
    // Get All recipes
    const userRecipe = await Recipe.findAll({
      attributes: [
        "id",
        "name",
        "time",
        "calories",
        "difficulty",
        "image",
      ],
      include: [
        {
          model: Ingredient,
          through: RecipeIngredient,
          as: "ingredients",
          attributes: ["id", "name"],
        },
      ],
    })

    // Clean Recipe data
    const userRecipeClean = userRecipe.map ((userRecipe) => userRecipe.get({plain: true}));
    
    // Get user fridge data if someone is logged in
    if(req.session.user_id) {
      const userFridge = await User.findOne({
        where: {
          id: req.session.user_id,
        },
        attributes: ["id", "name", "email"],
        include: [
          {
            model: Fridge,
            attributes: ["id", "user_id"],
            include: [
              {
                model: Ingredient,
                through: FridgeIngredient,
                as: "stocks",
                attributes: ["name"],
              }
            ]
          },
        ],
      });
      if(!userFridge){
        res.status(404).render("404");
      }

      // Clean userFridge data
      const userFridgeClean = userFridge.get({plain: true});

      userRecipeClean.sort((recipe1, recipe2) => {
        let recipe1IngredientCount = 0;
        let recipe2IngredientCount = 0;
        userFridgeClean.fridge.stocks.forEach(ingredient => {
          if (!!recipe1.ingredients.find(recipeIngredient => recipeIngredient.name === ingredient.name)) {
            recipe1IngredientCount++;
          }
          if (!!recipe2.ingredients.find(recipeIngredient => recipeIngredient.name === ingredient.name)) {
            recipe2IngredientCount++;
          }
        })
        return recipe2IngredientCount - recipe1IngredientCount;
      })

      res.render("home", { userRecipeClean, userFridgeClean, logged_in: req.session.logged_in, current_user: req.session.email, user_id: req.session.user_id }); 
      console.log("log in working showing fridge?");
    } else {
      res.render("home", { userRecipeClean });
    }
      
    } catch (err) {
      res.status(500).json(err);
    }
});

  

// Render login page
router.get("/login", async (req, res) => {
  try {
    res.render("login", {});
  } catch (err) {
    res.status(500).json(err);
  }
});

// Render register page
router.get("/register", async (req, res) => {
  try {
    res.render("register", {});
  } catch (err) {
    res.status(500).json(err);
  }
});

// Render logout page and log user out of application
router.get("/logout", async (req, res) => {
  try {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      })};
    // res.render("login", {});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
