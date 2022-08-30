const { Fridge, Ingredient, Recipe, User, FridgeIngredient } = require("../models");
const router = require("express").Router();
const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {
  Fridge.findAll({
    attributes: ["id"],
    include: [
      {
        model: User,
        attributes: ["name", "email"],
      },
      {
        model: Ingredient,
        through: FridgeIngredient,
        as: 'stocks',
        attributes: ["id", "name"],
      },
    ],
  })
    .then((data) => {
      const posts = data.map((post) => post.get({ plain: true }));
      res.render("fridge", { posts, logged_in: req.session.logged_in });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
