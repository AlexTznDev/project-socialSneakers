const express = require("express");
const router = express.Router();

const User = require("../models/User.model.js")
const bcrypt = require("bcryptjs")

//  GET => "/signup"
router.get("/signup", (req, res ,next) => {

    res.render("auth/signup-form.hbs")

})
// POST => "/signup"
router.post("/signup", async(req, res, next) => {

console.log(req.body)

const {username, email, password} = req.body

if(username === "" || email === "" || password === ""){
    res.status(401).render("auth/signup-form.hbs", {
        errorMessage: "All the require are necessary"
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
router.get("/login", (req, res ,next) => {
    res.render("auth/login-form.hbs")
})

// POS => "auth/login" => obtencion de la data para el log in.
router.post("/login", (req, res, next) => {
    console.log(req.body)
    const { username, password } = req.body

    if(username === "" || password === "") {
        res.status(401).render("auth/login-form.hbs", {
            errorMessage: "Todos los campos deben estar completados"
        })
        return;
    }
    // try {
    // const foundUser = await User.find() 
    // } catch (error) {
    //     next(error)
    // }
})










module.exports = router