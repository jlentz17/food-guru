const router = require("express").Router();

const userRoutes = require("./user-routes.js");
const recipeRoutes = require("./recipe-routes.js");
const categoryRoutes = require("./category-routes")


router.use("/users", userRoutes);   
router.use("/recipes", recipeRoutes)
router.use("/categories", categoryRoutes)

module.exports = router;
