const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Contact = new Schema({
  firstname: {
    type: String,
  }, 
  email: {
    type: String,
  },
  phone: {
    type: Number,
  },
  title: {
    type: String,
  },
  message: {
    type: String,
  }

});

module.exports = mongoose.model("Contact", Contact);