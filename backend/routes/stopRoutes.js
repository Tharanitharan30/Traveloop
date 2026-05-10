const express = require("express");

const router = express.Router();

const {
  createStop,
  getStopsByTrip,
  updateStop,
  deleteStop,
} = require("../controllers/stopController");

const {
  protect,
} = require("../middleware/authMiddleware");



router.post("/", protect, createStop);

router.get("/:tripId", protect, getStopsByTrip);

router.put("/:id", protect, updateStop);

router.delete("/:id", protect, deleteStop);



module.exports = router;