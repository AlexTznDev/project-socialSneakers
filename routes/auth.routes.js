const express = require("express");
const router = express.Router();

const User = require("../models/User.model.js")


//  GET => "/signup"
router.get("/signup", (req, res ,next) => {

    res.render("auth/signup-form.hbs")

})
// POST => "/signup"
router.post("/signup", async(req, res, next) => {
console.log(req.body)
const {username, email, password} = req.body
try {
    
 await User.create({
    username:username,
    email:email,
    password:password
 })

res.redirect("/auth/login")

} catch (error) {
    next(error)
}


})


//  GET => "/login"
router.get("/login", (req, res ,next) => {

    res.render("auth/login-form.hbs")

})










module.exports = router