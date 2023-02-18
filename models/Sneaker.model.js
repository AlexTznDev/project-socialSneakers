// const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const sneakerSchema = new mongoose.Schema(
  {
    // Sneaker
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    model: String,
    type: {
      type: String,
      enum: [""], //
    },
    size: Number,
    color: String,
    material: String,
    description: String,
    imagen: String,
    status: {
      type: String,
      enum: [""], //
    },

    likes: Number, // update +1.
    forSale: Boolean,
    price: Number,
  },
  {
    timestamps: true,
  }
);

const Sneaker = mongoose.model("Sneaker", sneakerSchema);

module.exports = Sneaker;
