const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Iframes = new Schema({
  src: {
    type: String,
  }
});

module.exports = mongoose.model("Iframes", Iframes);