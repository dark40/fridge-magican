const { Ingredient, Recipe, User } = require("../models");
const router = require("express").Router();
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  Ingredient.findAll({
    attributes: ["id", "name"],
    order: [["created_at", "DESC"]],
    include: [
      {
        model: Recipe,
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
      {
        model: User,
        attributes: ["name", "email"],
      },
    ],
  })
    .then((data) => {
      const posts = data.map((post) => post.get({ plain: true }));
      res.render("ingredient", { posts, logged_in: req.session.logged_in });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/edit/:id", withAuth, (req, res) => {
  Ingredient.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "name"],
    include: [
      {
        model: User,
        attributes: ["name", "email"],
      },
      {
        model: Recipe,
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
    .then((data) => {
      const post = data.get({ plain: true });
      res.render("edit-ingredient", { post, logged_in: req.session.logged_in });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/show/:id", withAuth, (req, res) => {
  Ingredient.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "name"],
    include: [
      {
        model: User,
        attributes: ["name", "email"],
      },
      {
        model: Recipe,
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
    .then((data) => {
      const post = data.get({ plain: true });
      res.render("show-ingredient", { post, logged_in: req.session.logged_in });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
