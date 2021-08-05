const router = require("express").Router();
const { Recipe, User, Vote, Category } = require("../../models");
const sequelize = require("../../config/connection")
const withAuth = require("../../utils/auth")

router.get("/", (req, res) => {
    Recipe.findAll()
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.statusCode(500).json(err);
      });
  });
  
  
  router.post('/', (req, res) => {
      Recipe.create({
        title: req.body.title,
        ingredients: req.body.ingredients,
        recipe_content: req.body.recipe_content,
        user_id: req.body.user_id
      })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    });
  router.put('/upvote', (req, res) => {
      Vote.create({
        user_id: req.body.user_id,
        recipe_id: req.body.recipe_id
      })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    });

    
module.exports = router;