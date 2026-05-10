const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  stop_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Stop",
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  cost: {
    type: Number,
    required: true,
  },

  duration_hours: {
    type: Number,
    required: true,
  },

  time_slot: {
    type: String,
    required: true,
  },

  notes: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Activity", activitySchema);