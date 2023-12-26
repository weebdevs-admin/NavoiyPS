const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Statist = new Schema({
  established: {
    type: Number,
  },
  teachers: {
    type: Number,
  },
  exteacher: {
    type: Number,
  },
  students: {
    type: Number,
  },
  winners: {
    type: Number,
  }

});

module.exports = mongoose.model("Statist", Statist);