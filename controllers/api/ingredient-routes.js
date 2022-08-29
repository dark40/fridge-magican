const router = require("express").Router();
const { Ingredient, User, Recipe, RecipeIngredient } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", (req, res) => {
  Ingredient.findAll({
    attributes: ["id", "name"],
    include: [
      {
        model: Recipe,
        through: RecipeIngredient,
        as: 'recipes',
        attributes: [
          "id",
          "name",
          "description",
          "instruction",
          "time",
          "calories",
          "difficulty",
        ],
      },
    ],
  })
    .then((data) => res.json({ data: data}))
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
