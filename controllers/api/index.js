const router = require("express").Router();

router.use("/users", require("./user-routes"));
router.use("/fridge", require("./fridge-routes"));
router.use("/ingredient", require("./ingredient-routes"));
router.use("/recipe", require("./recipe-routes"));

module.exports = router;
