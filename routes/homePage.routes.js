const express = require("express");
const router = express.Router();

const Sneaker = require("../models/Sneaker.model.js");



router.get("/",async (req, res, next) => {

try {
    const allSneakers = await Sneaker.find().select({ _id : 1 })
    let arrayOfId = []


// for(let i=0; allSneakers.){

// }


    console.log(allSneakers)
    console.log(allSneakers.length)

} catch (error) {
    
}


res.render("homePage/home-page.hbs")
})




module.exports = router