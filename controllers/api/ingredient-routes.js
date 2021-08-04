const router = require("express").Router();
const { Ingredient } = require("../../models");

router.get("/", (req, res) => {
    Ingredient.findAll()
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.statusCode(500).json(err);
      });
  });
module.exports = router;