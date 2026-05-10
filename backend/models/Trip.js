const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  start_date: {
    type: Date,
    required: true,
  },

  end_date: {
    type: Date,
    required: true,
  },

  cover_photo: {
    type: String,
    default: "",
  },

  is_public: {
    type: Boolean,
    default: false,
  },

  share_token: {
    type: String,
    required: true,
  },

  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Trip", tripSchema);