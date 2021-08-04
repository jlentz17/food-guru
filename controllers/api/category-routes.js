const router = require("express").Router();
const { Category, Recipe } = require("../../models");
const withAuth = require("../../utils/auth")

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
        attributes: ["title", "ingredients", "recipe_content"]
      }
    ]
  })
  .then((dbCatData) => {
    if (!dbCatData) {
        res.status(404).json({ message: 'No Category found with this id' });
        return;
    }
    res.json(dbCatData);
})
.catch(err => {
    console.log(err);
    res.status(500).json(err);
});

} );


module.exports = router;
