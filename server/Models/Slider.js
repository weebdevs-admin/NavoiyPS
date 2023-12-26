const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Slider = new Schema({
  img: {
    type: String,
  }

});

module.exports = mongoose.model("Slider", Slider);