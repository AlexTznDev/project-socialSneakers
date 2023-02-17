const express = require("express");
const router = express.Router();

const User = require("../models/User.model.js")

const { isLoggedIn } = require("../middlewares/auth-middlewares.js")

// GET => profile routes
router.get("/", isLoggedIn, (req, res, next) => {
    res.render("profile/user-profile.hbs")
})

module.exports = router