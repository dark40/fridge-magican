const router = require("express").Router();
const { Ingredient, User, Recipe } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", (req, res) => {
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
    .then((data) => res.json({ data: data, user_id: req.session.user_id }))
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
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
  Ingredient.create(req.body)
    .then((data) => res.json(data))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/:id", withAuth, (req, res) => {
  req.body["user_id"] = req.session.user_id;

  Ingredient.update(req.body, {
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

router.delete("/:id", withAuth, (req, res) => {
  Ingredient.destroy({
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

module.exports = router;
