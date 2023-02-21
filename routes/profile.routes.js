const express = require("express");
const router = express.Router();

const User = require("../models/User.model.js");
const Sneaker = require("../models/Sneaker.model.js");
const Comments = require("../models/Comments.model.js")

const { isLoggedIn } = require("../middlewares/auth-middlewares.js");
const uploader = require("../middlewares/cloudinary.js");

// const { response } = require("express");

// GET => profile routes
router.get("/", isLoggedIn, async (req, res, next) => {
  const { _id } = req.session.activeUser;
  try {
    // recojer la informacion con el id y enviar a la pagina profil para utilizar la informacion
    const responseUser = await User.findById(_id);
    const reponseSneaker = await Sneaker.find({ owner: _id });
    const shoesInSell = await Sneaker.find({ forSale: "For sale" }).select({
      forSale: 1,
    });
    const allFriends = await User.findById(_id)
      .select({ friends: 1 })
      .populate("friends");

    res.render("profile/user-profile.hbs", {
      userInfo: responseUser,
      allSneakers: reponseSneaker,
      shoesInSell: shoesInSell,
      allFriends: allFriends,
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

router.post("/postcreate", uploader.single("image"), async (req, res, next) => {
  const { _id } = req.session.activeUser;
  const { price, forSale, size, color, description, status, brand, model } =
    req.body;

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
router.get("/info-user/:id", async (req, res, next) => {
  const { id } = req.params;

  const { _id } = req.session.activeUser; //id del active user

  try {
      let isUserCanDelete = false;
    // const response = await Sneaker.findById(id).populate("owner");
    // const responseComment = await Sneaker.findById(id).populate({
    //   path: "comments.usuario",
    //   select: "username",
    // });
    // ********************************************************************
    const response = await Sneaker.findById(id).populate("owner");
    const responseComment = await Sneaker.findById(id).populate("comments")


    const postUserId = await Sneaker.findById(id);

    if (postUserId.owner == _id) {
      isUserCanDelete = true;
    }

    res.render("profile/post-info.hbs", {
      allPostInfo: response,
      allCommentInfo: responseComment,
      isUserCanDelete: isUserCanDelete,
    });
  } catch (error) {}
});

// => POST ("/info-user/:id") Ruta de aceptacion de comentarios
router.post("/info-user/:id", uploader.single("image"), async (req, res, next) => {
  const { id } = req.params;
  const { comments } = req.body;
  const { _id, username } = req.session.activeUser;
  const { price, forSale, size, color, description, status, brand, model } =
    req.body;

    let image;
    if (req.file !== undefined) {
      image = req.file.path;
    }


  try {
    // creando el comentario
    
    const response = await Comments.create({
      userId: _id,
      comentario: comments,
      name: username
    })

    
    if(comments !== undefined){
      await Sneaker.findByIdAndUpdate(id, { $push: {comments : response}
    })}
    
    // Actualizando el post 
    await Sneaker.findByIdAndUpdate(id, {
      brand: brand,
      model: model,
      size: size,
      color: color,
      description: description,
      status: status,
      forSale: forSale,
      price: price,
      image: image,
      
    });

    // await Sneaker.findByIdAndUpdate(id, {
    //   $push: { comments: { usuario: _id, comentario: comments } },
    // });

    //****************************************************
    

    console.log(response)
//******************************************************************
    res.redirect(`/profile/info-user/${id}`);
  } catch (error) {
    next(error);
  }
});

// => routa los perfil de amigos con sus id
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { _id } = req.session.activeUser;

  try {
    const allFriends = await User.findById(id)
      .select({ friends: 1 })
      .populate("friends");
    const response = await User.findById(id);
    const reponseSneaker = await Sneaker.find({ owner: id });
    const shoesInSell = await Sneaker.find({ owner: id } , { forSale: "For sale" }).select({
      forSale: 1,
    });

    const listFriendPostUser = await User.findById(id).select({ friends: 1 });

    let isNotFriend = true;
    listFriendPostUser.friends.forEach((eachId) => {
      if (eachId == _id) {
        isNotFriend = false;
      }
    });

    res.render("profile/friendProfile.hbs", {
      UserInfo: response,
      allSneakers: reponseSneaker,
      allFriends: allFriends,
      isNotFriend: isNotFriend,
      shoesInSell: shoesInSell
    });
  } catch (error) {}
});

// => POST ("/postId/delete")

router.post("/:postId/delete", async (req, res, next) => {
  const { postId } = req.params; // id del post sneaker entero

  try {
    await Sneaker.findByIdAndDelete(postId);
    res.redirect("/profile");
  } catch (err) {
    next(err);
  }
});

// => POST ("profile/:id/followFriend")

router.post("/:idFriend/followFriend", async (req, res, next) => {
  const { idFriend } = req.params;
  const { _id } = req.session.activeUser;

  try {
    await User.findByIdAndUpdate(idFriend, {
      $push: { friends: _id },
    });

    await User.findByIdAndUpdate(_id, {
      $push: { friends: idFriend },
    });
  } catch (error) {}

  res.redirect(`/profile/${idFriend}`);
});

module.exports = router;

//
