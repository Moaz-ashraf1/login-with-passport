const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  google_id: String,
  thumbnail: String,
});

module.exports = mongoose.model("User", userSchema);
