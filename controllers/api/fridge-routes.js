const router = require("express").Router();
const { Fridge, User, Recipe, Ingredient, FridgeIngredient } = require("../../models");
const withAuth = require("../../utils/auth");

router.put("/:id", async (req, res) => {
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
    res.status(200).render("fridge");
  } catch (err) {
    res.status(500).json("Internal Server Error");
  }
});

// router.delete("/:id", withAuth, (req, res) => {
//   Fridge.destroy({
//     where: {
//       id: req.params.id,
//     },
//   })
//     .then((data) => {
//       if (!data) {
//         res.status(404).json({ message: "No post found with this id" });
//         return;
//       }
//       res.json(data);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

module.exports = router;
