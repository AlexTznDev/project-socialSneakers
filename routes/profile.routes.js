const express = require("express");
const router = express.Router();

const User = require("../models/User.model.js");

const { isLoggedIn } = require("../middlewares/auth-middlewares.js");
const uploader = require("../middlewares/cloudinary.js");
const { response } = require("express");

// GET => profile routes
router.get("/", isLoggedIn, async (req, res, next) => {
    
    
    const { _id } = req.session.activeUser;
    try {
        // recojer la informacion con el id y enviar a la pagina profil para utilizar la informacion
        const response = await User.findById(_id)
        res.render("profile/user-profile.hbs", {
            userInfo : response
        });
        
    } catch (error) {
        next(error)
    }
  
});

//POST =>  Formulario en Edit profile container
router.post("/edit", uploader.single("image") , async (req, res, next) => {
  
  const { age, description, image } = req.body;
  const { _id } = req.session.activeUser;

  
  if (req.file !== undefined) {
    image = req.file.path
  }

  try {

    // update data from edit profil form
    const response = await User.findByIdAndUpdate(_id, {
      age: age,
      description: description,
      profilePicture: image
    });
    console.log(response);
  } catch (error) {}
  
  res.redirect("/profile");
});

module.exports = router;
