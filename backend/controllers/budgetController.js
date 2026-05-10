const Trip = require("../models/Trip");
const Stop = require("../models/Stop");
const Activity = require("../models/Activity");
const mongoose = require("mongoose");



exports.getTripBudget = async (
  req,
  res
) => {

  try {

    const { tripId } = req.params;

    // validate ID
    if (
      !mongoose.Types.ObjectId.isValid(
        tripId
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid Trip ID",
      });
    }

    // get trip
    const trip = await Trip.findById(
      tripId
    );

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

    // get stops
    const stops = await Stop.find({
      trip_id: tripId,
    });

    let totalBudget = 0;

    let stopBreakdown = [];

    // loop through stops
    for (const stop of stops) {

      const activities =
        await Activity.find({
          stop_id: stop._id,
        });

      let stopTotal = 0;

      activities.forEach((activity) => {
        stopTotal += activity.cost;
      });

      totalBudget += stopTotal;

      stopBreakdown.push({
        stop_id: stop._id,
        city_name: stop.city_name,
        total_cost: stopTotal,
        activity_count:
          activities.length,
      });
    }

    // calculate days
    const start =
      new Date(trip.start_date);

    const end =
      new Date(trip.end_date);

    const diffTime =
      Math.abs(end - start);

    const totalDays =
      Math.ceil(
        diffTime /
        (1000 * 60 * 60 * 24)
      ) + 1;

    const averagePerDay =
      totalBudget / totalDays;

    res.status(200).json({
      success: true,

      trip_name: trip.name,

      total_budget: totalBudget,

      total_days: totalDays,

      average_per_day:
        averagePerDay,

      stop_breakdown:
        stopBreakdown,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};