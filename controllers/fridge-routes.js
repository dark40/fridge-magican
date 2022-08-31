const { Fridge, Ingredient, User, FridgeIngredient } = require("../models");
const router = require("express").Router();
const withAuth = require("../utils/auth");

router.get("/:id", withAuth, async (req, res) => {
  try {
    // Get the fridge data based on the user that's logged in
    const userFridgeData = await User.findByPk(req.params.id, {
      include: [
        {
          model: Fridge,
        }
      ]
    });
    
    // Check that data is returned from the database
    if(!userFridgeData) {
      res.status(404).render("404");
    }

    // Clean the user fridge data
    const userFridgeDataClean = userFridgeData.get({ plain: true });
  
    // Get fridge ingredient data
    const fridgeIngredientData = await Fridge.findByPk(userFridgeDataClean.fridge.id, {
      include: [
        {
          model: Ingredient,
          through: FridgeIngredient,
          as: 'stocks'
        }
      ]
    });

    // Clean the fridge ingredient data
    const fridgeIngredientDataClean = fridgeIngredientData.get({ plain: true });
    
    // Render the page
    res.render("fridge", { userFridgeDataClean, fridgeIngredientDataClean, logged_in: req.session.logged_in, current_user: req.session.email, user_id: req.session.user_id });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
