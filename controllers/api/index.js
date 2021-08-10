// Bring in express router and create routes variables
const router = require("express").Router();

const userRoutes = require("./user-routes.js");
const recipeRoutes = require("./recipe-routes.js");
const categoryRoutes = require("./category-routes")
const commentRoutes = require("./comment-routes.js")

// Connect routes to query params
router.use("/users", userRoutes);   
router.use("/recipes", recipeRoutes)
// router.use("/categories", categoryRoutes)
router.use("/comments", commentRoutes)

// Export
module.exports = router;
