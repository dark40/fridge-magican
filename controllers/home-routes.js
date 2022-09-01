const { Fridge, Ingredient, Recipe, User, FridgeIngredient, RecipeIngredient} = require("../models");
const router = require("express").Router();
const withAuth = require("../utils/auth");

// Render homepage
router.get("/", withAuth, async (req, res) => {
  try{
    // Get user fridge data
    const userFridge = await Fridge.findOne({
      where: {
        id: req.session.user_id,
      },
      attributes: ["id", "user_id"],
      include: [
        {
          model: User,
          attributes: ["name", "email"],
        },
        {
          model: Ingredient,
          through: FridgeIngredient,
          as: "stocks",
          attributes: ["id", "name"],
        },
      ],
    });
    if(!userFridge){
      res.status(404).render("404");
    }

    // Clean userFridge data
    const userFridgeClean = userFridge.get({plain: true});
    console.log(userFridgeClean);

    // Get All recipes
    const userRecipe = await Recipe.findAll({
      attributes: [
        "id",
        "name",
        "time",
        "calories",
        "difficulty",
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
    console.log(userRecipeClean);

    // Render home page
    res.render("home", { userFridgeClean, userRecipeClean, logged_in: req.session.logged_in, current_user: req.session.email, user_id: req.session.user_id });   
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
    res.render("logout", {});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
