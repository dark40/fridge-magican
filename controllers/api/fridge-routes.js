const router = require("express").Router();
const { Fridge, User, Recipe, Ingredient, FridgeIngredient } = require("../../models");
const withAuth = require("../../utils/auth");

// router.get("/", (req, res) => {
//   Fridge.findAll({
//     attributes: ["id"],
//     include: [
//       {
//         model: Ingredient,
//         through: FridgeIngredient,
//         as: "stocks",
//         attributes: ["id", "name"],
//       },
//       {
//         model: User,
//         attributes: ["name", "email"],
//       },
//     ],
//   })
//     .then((data) => res.json({ data: data }))
//     .catch((err) => {
//       res.status(500).json(err);
//     });
// });

router.get("/:id", (req, res) => {
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
      if (!data) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", withAuth, (req, res) => {
  req.body["user_id"] = req.session.user_id;
  Fridge.create(req.body)
    .then((data) => res.json(data))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/:id", (req, res) => {
  req.body["user_id"] = req.session.user_id;

  Fridge.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// router.delete("/:id", withAuth, (req, res) => {
//   Fridge.destroy({
//     where: {
//       id: req.params.id,
//     },
//   })
//     .then((data) => {
//       if (!data) {
//         res.status(404).json({ message: "No post found with this id" });
//         return;
//       }
//       res.json(data);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

module.exports = router;
