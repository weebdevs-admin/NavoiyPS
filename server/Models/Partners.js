const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Partners = new Schema({
  img: {
    type: String,
  }

});

module.exports = mongoose.model("Partners", Partners);