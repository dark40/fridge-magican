const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/register", (req, res) => {
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  }).then((data) => {
    req.session.save(() => {
      req.session.user_id = data.id;
      req.session.email = data.email;
      req.session.logged_in = true;

      res.json(data);
    });
  });
});

router.post("/login", (req, res) => {
  console.log(req.body);
  User.findOne({
    where: {
      username: req.body.username,
    },
  }).then((data) => {
    if (!data) {
      res
        .status(400)
        .json({ message: "No user found with this email address!" });
      return;
    }
    const validPassword = data.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password!" });
      return;
    }
    req.session.save(() => {
      req.session.user_id = data.id;
      req.session.username = data.username;
      req.session.logged_in = true;

      res.json({ user: data, message: "You are now logged in!" });
    });
  });
});

router.post("/logout", withAuth, (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
