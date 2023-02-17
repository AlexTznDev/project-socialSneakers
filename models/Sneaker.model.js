const { Schema, model } = require("mongoose");

const sneakerSchema = new Schema(
  {
    // Sneaker
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
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

const Sneaker = model("Sneaker", sneakerSchema);

module.exports = Sneaker;
