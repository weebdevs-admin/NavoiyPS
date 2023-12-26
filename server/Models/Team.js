const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Team = new Schema({
  img: {
    type: String,
  },
  type: {
    type: String,
  }

});

module.exports = mongoose.model("Team", Team);