const mongoose = require("mongoose");

const searchSchema = new mongoose.Schema({
  search: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  owner:String,
  searchString: String,
  usernameString: String
});

const Search = mongoose.model("Search", searchSchema);

module.exports = Search;
