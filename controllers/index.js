const router = require("express").Router();

router.use("/", require("./home-routes"));
router.use("/fridge", require("./fridge-routes"));
// router.use("/ingredient", require("./api/ingredient-routes"));
// router.use("/recipe", require("./api/recipe-routes"));

router.use("/api", require("./api"));

router.use((req, res, next) => {
  if (res.status(404)) {
    res.render("404");
  }
});

module.exports = router;
