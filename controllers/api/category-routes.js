const router = require("express").Router();
const { Category } = require("../../models");
const withAuth = require("../../utils/auth")
  
router.get("/", (req, res) => {
    Category.findAll()
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.statusCode(500).json(err);
      });
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
