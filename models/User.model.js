// const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: String,

    age: Number,
    description: String,
    profilePicture: String,

    friends:[
      
      {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
      } 

    ]

    ,
    followers: Number, // bonus
    // following: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId, // BONUS
    //     ref: "User",
    //   },
    // ],

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },

  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
