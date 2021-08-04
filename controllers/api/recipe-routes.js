const router = require("express").Router();
const { Recipe } = require("../../models");
const sequelize = require("../../config/connection")
//const withAuth = require("../../utils/auth")


router.get("/", (req, res) => {
    Recipe.findAll()
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.statusCode(500).json(err);
      });
  });


module.exports = router;