const { Fridge, Ingredient, Recipe, RecipeIngredient } = require("../models");
const router = require("express").Router();
const withAuth = require("../utils/auth");

// add in with auth middleware
router.get("/:id", withAuth, async (req, res) => {
  try {
    const chosenRecipe = await Recipe.findByPk(req.params.id, {
      include: [
        {
          model: Ingredient,
          through: RecipeIngredient,
          as: 'ingredients'
        },
      ],
    });

    if(!chosenRecipe) {
      res.status(404).render("404");
    }

    const recipeClean = chosenRecipe.get({ plain: true });

    // Split recipe steps into an array
    const rstepsArray = recipeClean.instruction.split(/Step \d/);

    res.render("recipe", { recipeClean, rstepsArray, logged_in: req.session.logged_in, current_user: req.session.email, user_id: req.session.user_id });
  } catch {
    res.status(500).json("Internal Server Error");
  }
});

module.exports = router;