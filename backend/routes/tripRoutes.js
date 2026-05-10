const express = require("express");

const router = express.Router();

const {
  createTrip,
  getTrips,
  getSingleTrip,
  updateTrip,
  deleteTrip,
} = require("../controllers/tripController");

const {
  protect,
} = require("../middleware/authMiddleware");



router.post("/", protect, createTrip);

router.get("/", protect, getTrips);

router.get("/:id", protect, getSingleTrip);

router.put("/:id", protect, updateTrip);

router.delete("/:id", protect, deleteTrip);



module.exports = router;