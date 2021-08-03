const router = require("express").Router();
const { User } = require("../../models");

router.get("/", (req, res) => {
  User.findAll()
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.statusCode(500).json(err);
    });
});

// Tested rotes to make sure they were connected

// router.post('/', (req, res) => {
//     // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
//     User.create({
//       username: req.body.username,
//       email: req.body.email,
//       password: req.body.password
//     })
//       .then(dbUserData => res.json(dbUserData))
//       .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//       });
//   });

module.exports = router;
