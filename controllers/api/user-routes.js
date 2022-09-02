const router = require("express").Router();
const { User, Fridge } = require("../../models");
const {sendWelcomeEmail} = require("../../utils/email")

router.post("/register", async (req, res) => {
  
  const {name, email, password, password_confirmation, terms_confirmed} = req.body
  const errors = []
  if(!name) {
    errors.push("Name is required")
  }
  if(!email) {
    errors.push("Email is required")
  }
  if(password.length < 8 ) {
    errors.push("Password must be min. 8 charachters")
  }
  if(password !== password_confirmation) {
    errors.push("Password confirmation doesn't match")
  }
  if(!terms_confirmed) {
    errors.push("Terms & Conditions must be accepted")
  }

  if(errors.length) {
     res.status(400).json({errors})
    return;
  }
  const userDetails = await User.create({
    name,
    email,
    password,
  })

  const fridgeDetail = await Fridge.create({
    user_id: userDetails.id,
  })

  sendWelcomeEmail(userDetails.email)
  
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
