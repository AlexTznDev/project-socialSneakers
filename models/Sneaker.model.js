// const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const sneakerSchema = new mongoose.Schema(
  {
    // Sneaker
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    brand: String,
    model: String,
    size: Number,
    color: String,
    material: String,
    description: String,
    image: String,
    comments: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comments"  
    }],
    status: {
      type: String,
      enum: ["used" , "new"], //
    },

    likes: Number, // update +1.
    forSale: {
      type: String,
      enum: ["For sale" , "No, i keep it!"], //
    },
    price: Number,
  },
  {
    timestamps: true,
  }
);

const Sneaker = mongoose.model("Sneaker", sneakerSchema);

module.exports = Sneaker;
