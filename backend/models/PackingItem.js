const mongoose = require("mongoose");

const packingItemSchema = new mongoose.Schema({
  trip_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Trip",
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

  is_packed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model(
  "PackingItem",
  packingItemSchema
);