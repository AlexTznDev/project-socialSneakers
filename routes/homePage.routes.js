const express = require("express");
const router = express.Router();

const Sneaker = require("../models/Sneaker.model.js");

router.get("/", async (req, res, next) => {
  try {
    const allSneakers = await Sneaker.find().select({ _id: 1 , image:1});
    let arrayOfId = [];

    for (let i = arrayOfId.length; arrayOfId.length < 20; i++) {
      let randomNumber = Math.floor(Math.random() * allSneakers.length);
      if (!arrayOfId.includes(allSneakers[randomNumber])) {
        arrayOfId.push(allSneakers[randomNumber]);
      }
    }
    console.log(arrayOfId);

    res.render("homePage/home-page.hbs", {
        allId : arrayOfId
    });

  } catch (error) {}


});

module.exports = router;
