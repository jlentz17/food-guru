const router = require("express").Router();
const sequelize = require("../config/connection")
const { Recipe, User, Category, Vote } = require("../models")


router.get('/', (req, res) => {
    //console.log('======================');
    Recipe.findAll({
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
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbPostData => {
        const recipes = dbPostData.map(post => post.get({ plain: true }));
  
        res.render('homepage', {
          recipes,
          loggedIn: req.session.loggedIn
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  // get single post
  router.get('/recipes/:id', (req, res) => {
    Recipe.findOne({
      where: {
        id: req.params.id
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
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No recipe found with this id' });
          return;
        }
  
        const post = dbPostData.get({ plain: true });
  
        res.render('single-recipe');
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });
  
  module.exports = router;