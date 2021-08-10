// Bring in router, category model, and authorization file
const router = require("express").Router();
const { Category } = require("../../models");
const withAuth = require("../../utils/auth");

// Get all categories
router.get("/", (req, res) => {
    Category.findAll()
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.statusCode(500).json(err);
      });
  });

// Get category by id 
router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.body
    }
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

// Create a category
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
