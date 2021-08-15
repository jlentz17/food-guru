const router = require("express").Router();
const { Category, Recipe } = require("../../models");
const sequelize = require('../../config/connection');
const withAuth = require("../../utils/auth");
  
router.get("/", (req, res) => {
    Category.findAll()
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.statusCode(500).json(err);
      });
  });

router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
      model: Recipe,
      attributes: [
        'id', 'title', 'ingredients', 'recipe_content', 'user_id']
      }
    ]
  })
  .then(dbCatData => {
    if (!dbCatData){
      res.status(404).json({ message: 'No Category found with this ID'});
      return;
    }
    res.json(dbCatData);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);


  })
});

router.post('/', (req, res) => {
    Category.create({
      category_name: req.body.category_name,
      recipe_id: req.body.recipe_id
    })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});
  



module.exports = router;
