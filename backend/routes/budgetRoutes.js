const express = require("express");

const router = express.Router();

const {
  getTripBudget,
} = require(
  "../controllers/budgetController"
);

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);



router.get(
  "/:tripId",
  protect,
  getTripBudget
);



module.exports = router;