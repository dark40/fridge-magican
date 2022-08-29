const { Fridge, Ingredient, Recipe, User } = require("../models");
const router = require("express").Router();
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  Recipe.findAll({
    attributes: [
      "id",
      "name",
      "description",
      "instruction",
      "time",
      "calories",
      "difficulty",
    ],
    order: [["created_at", "DESC"]],
    include: [
      {
        model: Ingredient,
        attributes: ["id", "name"],
      },
    ],
  })
    .then((data) => {
      const posts = data.map((post) => post.get({ plain: true }));
      res.render("recipe", { posts, logged_in: req.session.logged_in });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/edit/:id", withAuth, (req, res) => {
  Recipe.findOne({
    where: {
      id: req.params.id,
    },
    attributes: [
      "id",
      "name",
      "description",
      "instruction",
      "time",
      "calories",
      "difficulty",
    ],
    include: [
      {
        model: Ingredient,
        attributes: ["id", "name"],
      },
    ],
  })
    .then((data) => {
      const post = data.get({ plain: true });
      res.render("edit-recipe", { post, logged_in: req.session.logged_in });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/show/:id", withAuth, (req, res) => {
  Recipe.findOne({
    where: {
      id: req.params.id,
    },
    attributes: [
      "id",
      "name",
      "description",
      "instruction",
      "time",
      "calories",
      "difficulty",
    ],
    include: [
      {
        model: Ingredient,
        attributes: ["id", "name"],
      },
    ],
  })
    .then((data) => {
      const post = data.get({ plain: true });
      res.render("show-recipe", { post, logged_in: req.session.logged_in });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
