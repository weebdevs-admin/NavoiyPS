const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Login = new Schema({
  Login: {
    type: String,
  }, 
  Password: {
    type: String,
  }

});

module.exports = mongoose.model("Login", Login);