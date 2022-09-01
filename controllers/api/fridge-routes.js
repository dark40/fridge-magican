const router = require("express").Router();
const { Fridge, User, Recipe, Ingredient, FridgeIngredient } = require("../../models");
const withAuth = require("../../utils/auth");

router.put("/:id", withAuth, async (req, res) => {
  try {
    // Find all previous ingredients associations and destroy them
    const destroyReturnValue = await FridgeIngredient.destroy({
      where: { fridge_id: req.params.id}
    });

    // Add updated associations based on items added on front end
    if (req.body.ingredients.length) {
      const fridgeIngredientsArray = req.body.ingredients.map((ingredient_id) => {
        return {
          ingredient_id,
          fridge_id: req.params.id
        };
      });
      // Create the new relationships in the FridgeIngredients model
      const createdLinks = await FridgeIngredient.bulkCreate(fridgeIngredientsArray);
    };
    // Provide success response
    res.status(200).json("Ingredients successfully added!");
  } catch (err) {
    res.status(500).json("Internal Server Error");
  }
});

module.exports = router;
