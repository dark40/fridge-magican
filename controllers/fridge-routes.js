const { Fridge, Ingredient, Recipe, User, FridgeIngredient } = require("../models");
const router = require("express").Router();
const withAuth = require("../utils/auth");

router.get("/:id", withAuth, async (req, res) => {
  try {
    const userFridgeData = await User.findByPk(req.params.id, {
      include: [
        {
          model: Fridge,
          through: FridgeIngredient,
          as: 'fridges'
        }
      ]
    });
    
    if(!userFridgeData) {
      res.status(404).render("404");
    }
  
    const fridge = userFridgeData.map((fridges) => fridges.get({ plain: true }))
  
    res.render("fridge", { fridge });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
