const express = require('express');
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});


const authorRoutes = require("./auth.routes.js")
router.use("/auth", authorRoutes)

const profileRoutes = require("./profile.routes.js")
router.use("/profile", profileRoutes)

module.exports = router;
