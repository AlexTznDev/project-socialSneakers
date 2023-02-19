const express = require("express");
const router = express.Router();

const User = require("../models/User.model.js");
const Sneaker = require("../models/Sneaker.model.js");

const { isLoggedIn } = require("../middlewares/auth-middlewares.js");
const uploader = require("../middlewares/cloudinary.js");



// const { response } = require("express");

// GET => profile routes
router.get("/", isLoggedIn, async (req, res, next) => {
  const { _id } = req.session.activeUser;
  try {
    // recojer la informacion con el id y enviar a la pagina profil para utilizar la informacion
    const responseUser = await User.findById(_id);
    const reponseSneaker = await Sneaker.find({ owner: _id })


    res.render("profile/user-profile.hbs", {
      userInfo: responseUser,
      allSneakers: reponseSneaker,
      
    });

  } catch (error) {
    next(error);
  }
});

//POST =>  Formulario en Edit profile container
router.post("/edit", uploader.single("image"), async (req, res, next) => {
  const { age, description } = req.body;
  const { _id } = req.session.activeUser;

  // const para cloudinary el url
  let image;
  if (req.file !== undefined) {
    image = req.file.path;
  }

  try {
    // update data from edit profil form
    const response = await User.findByIdAndUpdate(_id, {
      age: age,
      description: description,
      profilePicture: image, // url de cloudinary
    });
  } catch (error) {}

  res.redirect("/profile");
});

//POST => Formulario de Create Post

router.post("/postcreate", uploader.single("image"),  async (req, res, next) => {
  const { _id } = req.session.activeUser;
  const {
    price,
    forSale,
    size,
    color,
    description,
    status,
    brand,
    model,
    
  } = req.body;


  let image;
  if (req.file !== undefined) {
    image = req.file.path;
  }

  try {
    const response = await Sneaker.create({
      owner: _id,
      brand: brand,
      model: model,
      size: size,
      color: color,
      description: description,
      image: image,
      status: status,
      forSale: forSale,
      price: price,
    });
  } catch (error) {
    next(error);
  }

  res.redirect("/profile");
});



// => GET "/info-user/:id" routa del information de la vignetta
router.get("/info-user/:id", async  (req, res, next) => {
const {id} = req.params

try {
    const response = await Sneaker.findById(id).populate("owner")
    console.log(response)
res.render("profile/post-info.hbs", {
    allPostInfo : response
})

} catch (error) {
    
}
})




module.exports = router;

//