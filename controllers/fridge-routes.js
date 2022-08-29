const { Fridge, Ingredient, Recipe, User } = require("../models");
const router = require("express").Router();
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  Fridge.findAll({
    attributes: ["id"],
    include: [
      {
        model: User,
        attributes: ["name", "email"],
      },
      {
        model: Ingredient,
        attributes: ["id", "name"],
        include: {
          model: User,
          attributes: ["email", "name"],
        },
      },
    ],
  })
    .then((data) => {
      const posts = data.map((post) => post.get({ plain: true }));
      res.render("home", { posts, logged_in: req.session.logged_in });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/edit/:id", withAuth, (req, res) => {
  Fridge.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id"],
    include: [
      {
        model: User,
        attributes: ["name", "email"],
      },
      {
        model: Ingredient,
        attributes: ["id", "name"],
        include: {
          model: User,
          attributes: ["email", "name"],
        },
      },
    ],
  })
    .then((data) => {
      const post = data.get({ plain: true });
      res.render("edit-post", { post, logged_in: req.session.logged_in });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/show/:id", withAuth, (req, res) => {
  Fridge.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id"],
    include: [
      {
        model: User,
        attributes: ["name", "email"],
      },
      {
        model: Ingredient,
        attributes: ["id", "name"],
        include: {
          model: User,
          attributes: ["email", "name"],
        },
      },
    ],
  })
    .then((data) => {
      const post = data.get({ plain: true });
      res.render("single-post", { post, logged_in: req.session.logged_in });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
