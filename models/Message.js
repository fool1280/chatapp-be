const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  username: String,
  body: String,
  avatar: String,
});

module.exports = mongoose.model("Messages", schema);
