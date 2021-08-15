const router = require("express").Router();
const sequelize = require("../config/connection");
const { Recipe, User, Category, Vote, Comment } = require("../models");
const withAuth = require("../utils/auth");

// Get all recipes
router.get('/', withAuth, (req, res) => {
    console.log(req.session);
    console.log('======================');
    Recipe.findAll({
      where: {
        user_id: req.session.user_id
      },
      attributes: [
        'id',
        'title',
        'ingredients',
        'recipe_content',
        'created_at',
        [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE recipe.id = vote.recipe_id)'), 'vote_count']
      ],
      include: [
        {
          model: Comment,
          attributes: ["id", "comment_text", "recipe_id", "user_id", "created_at"],
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
      .then(dbRecipeData => {
        console.log(dbRecipeData)
        const userRecipes = dbRecipeData.map(recipe => recipe.get({ 
          plain: true }));
          console.log(userRecipes)
          console.log(dbRecipeData)
        res.render('dashboard', { userRecipes, loggedIn: true });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  // Edit Recipe
  router.put('/edit/:id', withAuth, (req, res) => {
    Recipe.update(req.params.id, {
      attributes: [
        'id',
        'title',
        'ingredients',
        'recipe_content',
        'created_at',
        [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE recipe.id = vote.recipe_id)'), 'vote_count']
      ],
      include: [
        {
          model: Comment,
          attributes: ["id", "comment_text", "recipe_id", "user_id", "created_at"],
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
      .then(dbRecipeData => {
        if (dbRecipeData) {
          const recipe = dbRecipeData.get({ plain: true });
          
          res.render('edit-recipe', {
            recipe,
            loggedIn: true
          });
        } else {
          res.status(404).end();
        }
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });

// router.get('/new', (req, res) => {
//     res.render('add-recipe');
// });





module.exports = router;
