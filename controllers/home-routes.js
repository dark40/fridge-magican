const { Fridge, Ingredient, Recipe, User } = require("../models");
const router = require("express").Router();

// Render homepage
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
      res.render("home", { posts, logged_in: req.session.logged_in, current_user: req.session.email, user_id: req.session.user_id });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// Render login page
router.get("/login", async (req, res) => {
  try {
    res.render("login", {});
  } catch (err) {
    res.status(500).json(err);
  }
});

// Render register page
router.get("/register", async (req, res) => {
  try {
    res.render("register", {});
  } catch (err) {
    res.status(500).json(err);
  }
});

// Render logout page and log user out of application
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
