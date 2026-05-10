const express = require("express");

const router = express.Router();

const {
  getPublicTrip,
  copyTrip,
} = require(
  "../controllers/publicController"
);

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);



// PUBLIC VIEW
router.get(
  "/:shareToken",
  getPublicTrip
);



// COPY TRIP
router.post(
  "/copy/:shareToken",
  protect,
  copyTrip
);



module.exports = router;