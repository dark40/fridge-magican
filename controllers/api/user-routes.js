const router = require("express").Router();
const { User, Fridge } = require("../../models");
// const {sendWelcomeEmail} = require("../../utils/email")

router.post("/register", async (req, res) => {
  
  const userDetails = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  })

  const fridgeDetail = await Fridge.create({
    user_id: userDetails.id,
  })

  // sendWelcomeEmail(userDetails.email)
  
  req.session.save(() => {
    req.session.user_id = userDetails.id;
    req.session.email = userDetails.email;
    req.session.logged_in = true;

    res.json("You have registered");
  })

});

router.post("/login", (req, res) => {
  console.log(req.body);
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((data) => {
    if (!data) {
      res
        .status(400)
        .json({ message: "No user found with this name!" });
      return;
    }
    const validPassword = data.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password!" });
      return;
    }
    req.session.save(() => {
      req.session.user_id = data.id;
      req.session.email = data.email;
      req.session.logged_in = true;

      res.json({ user: data, message: "You are now logged in!" });
    });
  });
});

module.exports = router;
