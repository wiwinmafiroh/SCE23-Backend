const mongoose = require("mongoose");

// User Schema
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// User Model
const User = mongoose.model("User", userSchema);

module.exports = User;
