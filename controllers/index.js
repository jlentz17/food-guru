// Bring in router, and all the routes
const router = require("express").Router();

const apiRoutes = require("./api");
const homeRoutes = require("./home-routes");
const dashboardRoutes = require("./dashboard-routes");

// Connect routes to prefixes
router.use("/", homeRoutes);
router.use("/api", apiRoutes);
router.use("/dashboard", dashboardRoutes);


router.use((req, res) => {
  res.status(404).end();
});

// Export
module.exports = router;