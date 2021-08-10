// Bring in router, models, sequelize, and authorization file
const router = require("express").Router();
const { Recipe, User, Vote, Category, Comment } = require("../../models");
const sequelize = require("../../config/connection");
const withAuth = require("../../utils/auth");

// Get all recipes
router.get("/", (req, res) => {
  Recipe.findAll({
    attributes: [
      "id",
      "title",
      "ingredients",
      "recipe_content",
      "created_at",
      [
        sequelize.literal(
          "SELECT COUNT(*) FROM vote WHERE recipe.id = vote.recipe_id)"
        ),
        "vote_count",
      ],
    ],
    order: [["created_at", "DESC"]],
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
    .then((dbRecipeData) => res.json(dbRecipeData))
    .catch((err) => {
      console.log(err);
      res.statusCode(500).json(err);
    });
});

// Get recipe by id
router.get("/:id", (req, res) => {
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
      res.json(dbRecipeData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Update recipe
router.post("/", withAuth, (req, res) => {
  console.log("postHit")
  Recipe.create({
    title: req.body.title,
    ingredients: req.body.ingredients,
    recipe_content: req.body.recipe_content,
    user_id: req.body.user_id,
  })
    .then((dbRecipeData) => res.json(dbRecipeData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
    console.log("endPost")
});

// Upvote recipe
router.put("/upvote", (req, res) => {
  if (req.session) {

    Recipe.upvote({...req.body, user_id: req.session.user_id }, { Vote, Comment, User })
      .then(updatedVoteData => res.json(updatedVoteData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  }
});

// Update recipe
router.put("/:id", withAuth, (req, res) => {
  Recipe.update(
    {
      title: req.body.title,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbRecipeData) => {
      if (!dbRecipeData) {
        res.status(404).json({ message: "No recipe found with this id" });
        return;
      }
      res.json(dbRecipeData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Delete recipe
router.delete("/:id", withAuth, (req, res) => {
  Recipe.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbRecipeData) => {
      if (!dbRecipeData) {
        res.status(404).json({ message: "No recipe found with this id" });
        return;
      }
      res.json(dbRecipeData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Export
module.exports = router;
