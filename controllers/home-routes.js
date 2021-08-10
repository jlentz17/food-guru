// Bring in router, sequelize, and models
const router = require("express").Router();
const sequelize = require("../config/connection");
const { Recipe, User, Category, Comment } = require("../models");

// Get all recipes
router.get("/", (req, res) => {
  //console.log('======================');
  Recipe.findAll({
    attributes: [
      "id",
      "title",
      "ingredients",
      "recipe_content",
      "created_at",
      [
        sequelize.literal(
          "(SELECT COUNT(*) FROM vote WHERE recipe.id = vote.recipe_id)"
        ),
        "vote_count",
      ],
    ],
    include: [
      {
        model: Comment,
        attributes: [
          "id",
          "comment_text",
          "recipe_id",
          "user_id",
          "created_at"
        ],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbRecipeData) => {
      const recipes = dbRecipeData.map((recipe) => recipe.get({ plain: true }));

      res.render("homepage", {
        recipes,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get single recipe
router.get("/recipe/:id", (req, res) => {
  Recipe.findOne({
    where: {
      id: req.params.id,
    },
    attributes: [
      "id",
      "title",
      "ingredients",
      "recipe_content",
      "created_at",
      [
        sequelize.literal(
          "(SELECT COUNT(*) FROM vote WHERE recipe.id = vote.recipe_id)"
        ),
        "vote_count",
      ],
    ],
    include: [
      {
        model: Comment,
        attributes: [
          "id",
          "comment_text",
          "recipe_id",
          "user_id",
          "created_at",
        ],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbRecipeData) => {
      if (!dbRecipeData) {
        res.status(404).json({ message: "No recipe found with this id" });
        return;
      }

      const recipe = dbRecipeData.get({ plain: true });

      res.render("single-recipe", {
        recipe,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Login route!
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

// Export
module.exports = router;
