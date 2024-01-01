const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Abaut = new Schema({
  img: {
    type: String,
  }, 
  title: {
    type: String,
  },
  desc: {
    type: String,
  },
  iframe:{
    type: String
  }

});

module.exports = mongoose.model("Abaut", Abaut);