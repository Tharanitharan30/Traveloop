const mongoose = require("mongoose");

const tripNoteSchema = new mongoose.Schema({
  trip_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Trip",
    required: true,
  },

  stop_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Stop",
    required: true,
  },

  content: {
    type: String,
    required: true,
  },

  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model(
  "TripNote",
  tripNoteSchema
);