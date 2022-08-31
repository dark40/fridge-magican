const { Fridge, Ingredient, Recipe, User, FridgeIngredient } = require("../models");
const router = require("express").Router();
const withAuth = require("../utils/auth");

router.get("/:id", withAuth, async (req, res) => {
  try {
    const userFridgeData = await User.findByPk(req.params.id, {
      include: [
        {
          model: Fridge,
        }
      ]
    });
    
    if(!userFridgeData) {
      res.status(404).render("404");
    }

    const userFridgeDataClean = userFridgeData.get({ plain: true });
  
    res.render("fridge", { userFridgeDataClean , logged_in: req.session.logged_in, current_user: req.session.email, user_id: req.session.user_id });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
