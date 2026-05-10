const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password_hash: {
    type: String,
    required: true,
  },

  avatar: {
    type: String,
    default: "",
  },

  language: {
    type: String,
    default: "en",
  },

  is_staff: {
    type: Boolean,
    default: false,
  },

  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);