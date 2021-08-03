const router = require("express").Router();

const userRoutes = require("./user-routes.js");
const recipeRoutes = require("./recipe-routes.js");

router.use("/users", userRoutes);
router.use("/recipe", recipeRoutes)

module.exports = router;
