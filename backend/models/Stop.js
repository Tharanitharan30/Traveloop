const mongoose = require("mongoose");

const stopSchema = new mongoose.Schema({
  trip_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Trip",
    required: true,
  },

  city_name: {
    type: String,
    required: true,
  },

  country: {
    type: String,
    required: true,
  },

  country_code: {
    type: String,
    required: true,
  },

  order: {
    type: Number,
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
});

module.exports = mongoose.model("Stop", stopSchema);