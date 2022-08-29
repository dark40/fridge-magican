const { Fridge, Ingredient, Recipe, User } = require("../models");
const router = require("express").Router();

router.get("/", async (req, res) => {
  Fridge.findAll({
    attributes: ["id"],
    include: [
      {
        model: User,
        attributes: ["name", "email"],
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

router.get("/login", async (req, res) => {
  try {
    res.render("login", {});
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/register", async (req, res) => {
  try {
    res.render("register", {});
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/logout", async (req, res) => {
  try {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      })};
    res.render("logout", {});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
