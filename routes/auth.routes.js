const express = require("express");
const router = express.Router();

const User = require("../models/User.model.js")
const bcrypt = require("bcryptjs")

const { isSessionOn } = require("../middlewares/auth-middlewares.js")

//  GET => "/signup"
router.get("/signup", isSessionOn, (req, res ,next) => {

    res.render("auth/signup-form.hbs")

})
// POST => "/signup"
router.post("/signup", async(req, res, next) => {



const {username, email, password} = req.body

if(username === "" || email === "" || password === ""){
    res.status(401).render("auth/signup-form.hbs", {
        errorMessage: "All field must be completed"
    })
    return
}

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;


if(passwordRegex.test(password)  === false){
    res.render("auth/signup-form.hbs", {
        errorMessage: "Password need 8 caracters minimum 1 capital letter and 1 special caracter"
    });
    return 
} 


try {
    

const foundUser = await User.findOne({username: username})


if(foundUser !== null){
    res.render("auth/signup-form.hbs", {
        errorMessage: "username already use"
    })
    return
}


const foundUserEmail = await User.findOne({email : email})

if(foundUserEmail !== null){
    res.render("auth/signup-form.hbs", {
        errorMessage: "email already use"
    })
    return
}
const salt = await bcrypt.genSalt(12)
const hashPassword = await bcrypt.hash (password, salt)



 await User.create({
    username: username,
    email: email,
    password: hashPassword
 })

res.redirect("/auth/login")

} catch (error) {
    next(error)
}


})


//  GET => "/login"
router.get("/login", isSessionOn,(req, res ,next) => {
    res.render("auth/login-form.hbs")
})

// POS => "auth/login" => obtencion de la data para el log in.
router.post("/login", async (req, res, next) => {

    const { username, password } = req.body

    if(username === "" || password === "") {
        res.status(401).render("auth/login-form.hbs", {
            errorMessage: "All field must be completed"
        })
        return;
    }

    try {
    const foundUser = await User.findOne({username: username})
    if(foundUser === null) {
        res.status(401).render("auth/login-form.hbs", {
            errorMessage: "Username doesn't exist"
        })
        return;
    }

    const isPasswordCorrect = await bcrypt.compare(password, foundUser.password)
    if(isPasswordCorrect === false){
        res.status(401).render("auth/login-form.hbs", {
            errorMessage: "Password is incorrect"
        })
        return;
    }

    req.session.activeUser = foundUser
    req.session.save(() => {

        res.redirect("/profile")
    })

    

    } catch (error) {
        next(error)
    }
})


router.get("/logout", (req, res, next) => {
    req.session.destroy(() => {
      res.redirect("/home");
    });
  });










module.exports = router