const router = require("express").Router();
const htmlRoutes = require("./html/html-routes");
// Import all of the API routes from /api/index.js (no need for index.js though since it's implied)
const apiRoutes = require("../routes/api");

router.use("/", htmlRoutes);
// add prefix of `/api` to all of the api routes imported from the `api` directory
router.use("/api", apiRoutes);

router.use((req, res) => {
  res.status(404).send("<h1>😝 404 Error!</h1>");
});

module.exports = router;
