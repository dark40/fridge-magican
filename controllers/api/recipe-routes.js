const router = require("express").Router();
const { Recipe, Ingredient } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", (req, res) => {
  Recipe.findAll({
    attributes: [
      "id",
      "name",
      "description",
      "instruction",
      "time",
      "calories",
      "difficulty",
    ],
    order: [["created_at", "DESC"]],
    include: [
      {
        model: Ingredient,
        attributes: ["id", "name"],
      },
    ],
  })
    .then((data) => res.json({ data: data, user_id: req.session.user_id }))
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  Recipe.findOne({
    where: {
      id: req.params.id,
    },
    attributes: [
      "id",
      "name",
      "description",
      "instruction",
      "time",
      "calories",
      "difficulty",
    ],
    include: [
      {
        model: Ingredient,
        attributes: ["id", "name"],
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
  Recipe.create(req.body)
    .then((data) => res.json(data))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/:id", withAuth, (req, res) => {
  req.body["user_id"] = req.session.user_id;

  Recipe.update(req.body, {
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
  Recipe.destroy({
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
