const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Gallery = new Schema({
  img: {
    type: String,
  }
});

module.exports = mongoose.model("Gallery", Gallery);