const express = require("express");
const router = express.Router();

const Sneaker = require("../models/Sneaker.model.js");
const User = require("../models/User.model.js");

router.get("/", async (req, res, next) => {
  const { search } = req.query;
  const { searchFriend } = req.query;

  console.log(search);
  console.log(searchFriend);

  if (req.session.activeUser !== undefined) {
    const { _id } = req.session.activeUser;
    try {
      const allSneakers = await Sneaker.find().select({ _id: 1, image: 1 });
      const allSearch = await Sneaker.find({ brand: search }).select({
        _id: 1,
        image: 1,
      });
      const SearchUser = await User.find({ username: searchFriend }).select({
        _id: 1,
        profilePicture: 1,
      });



      if (search === undefined && searchFriend === undefined) {
        let arrayOfId = [];
        if (allSneakers.length > 20) {
          for (let i = arrayOfId.length; arrayOfId.length < 20; i++) {
            let randomNumber = Math.floor(Math.random() * allSneakers.length);
            if (!arrayOfId.includes(allSneakers[randomNumber])) {
              arrayOfId.push(allSneakers[randomNumber]);
            }
          }
        } else {
          for (
            let i = arrayOfId.length;
            arrayOfId.length < allSneakers.length;
            i++
          ) {
            let randomNumber = Math.floor(Math.random() * allSneakers.length);
            if (!arrayOfId.includes(allSneakers[randomNumber])) {
              arrayOfId.push(allSneakers[randomNumber]);
            }
          }
        }
        console.log(arrayOfId);
        res.render("homePage/home-page.hbs", {
          allId: arrayOfId,
        });
      } 
      else if (search !== undefined) {
        console.log("je suis dans search brand")
        res.render("homePage/home-page.hbs", {
          allId: allSearch,
        });
      } else if (searchFriend !== undefined) {
        console.log("je suis dans search user")
        console.log(SearchUser)
        res.render("homePage/home-page.hbs", {
          allId: SearchUser,
        });
      }
    } catch (error) {
      next(error);
    }
  }

});



module.exports = router;
