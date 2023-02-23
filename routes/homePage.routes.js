const express = require("express");
const router = express.Router();

const Sneaker = require("../models/Sneaker.model.js");
const Search = require("../models/search.model.js");
const User = require("../models/User.model.js")



router.get("/", async (req, res, next) => {


  
  

if(req.session.activeUser !== undefined){ 
  const { _id } = req.session.activeUser;
  try {
    const allSneakers = await Sneaker.find().select({ _id: 1, image: 1 });
    const response = await Search.find({ owner: _id });
    

    if (response.length == 0) {
      await Search.create({
        search: [],
        searchString: "",
        owner: _id,
        usernameString:""
      });
    }else{
        await Search.find({ owner: _id }).update({
            search: [],
            searchString: "",
            owner: _id,
            usernameString:""
        })
    }

    let arrayOfId = [];


    if(allSneakers.length > 20){
        for (let i = arrayOfId.length; arrayOfId.length < 20; i++) {
            let randomNumber = Math.floor(Math.random() * allSneakers.length);
            if (!arrayOfId.includes(allSneakers[randomNumber])) {
              arrayOfId.push(allSneakers[randomNumber]);
            }
          }
    }else {
        for (let i = arrayOfId.length; arrayOfId.length < allSneakers.length ; i++) {
            let randomNumber = Math.floor(Math.random() * allSneakers.length);
            if (!arrayOfId.includes(allSneakers[randomNumber])) {
              arrayOfId.push(allSneakers[randomNumber]);
            }
          }
    }


    res.render("homePage/home-page.hbs", {
      allId: arrayOfId,
   

    });
  } catch (error) {
    next(error)
  }
} else if (req.session.activeUser === undefined){
  const response2 = await Sneaker.find().select({image:1})
  res.render("homePage/home-page.hbs",{
    allId2: response2
  })
}

});

//=> GET ("/search")

router.get("/search", async (req, res, next) => {
  const { _id } = req.session.activeUser;

  try {
    const responseSearchUser = await Search.find({owner: _id}).select({searchString:1, usernameString:1});
    
    const responseToSearch = await Sneaker.find({ brand: responseSearchUser[0].searchString }).select({
      image: 1,
    })
    const responsUserToSearch = await User.find({ username: responseSearchUser[0].usernameString }).select({
        profilePicture: 1,
    })

    res.render("homePage/home-page-search.hbs",{
        responseToSearch:responseToSearch,
        responsUserToSearch:responsUserToSearch
      });

  } catch (error) {
    next(error)
  }


});

//=> POST ("/search")
router.post("/search", async (req, res, next) => {
  const { search } = req.body;
  const { searchFriend } = req.body;
  const { _id } = req.session.activeUser;


  try {
    const response = await Search.find({ owner: _id }).update({
      searchString: search,
      usernameString:searchFriend
    });
  } catch (error) {
    next(error)
  }

  res.redirect("/home/search");
});

module.exports = router;
