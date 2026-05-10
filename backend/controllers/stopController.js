const Stop = require("../models/Stop");
const mongoose = require("mongoose");



// CREATE STOP
exports.createStop = async (req, res) => {

  try {

    const {
      trip_id,
      city_name,
      country,
      country_code,
      order,
      start_date,
      end_date,
    } = req.body;

    const stop = await Stop.create({
      trip_id,
      city_name,
      country,
      country_code,
      order,
      start_date,
      end_date,
    });

    res.status(201).json({
      success: true,
      message: "Stop added successfully",
      stop,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};




// GET ALL STOPS FOR TRIP
exports.getStopsByTrip = async (req, res) => {

  try {

    const { tripId } = req.params;

    if (
      !mongoose.Types.ObjectId.isValid(tripId)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid Trip ID",
      });
    }

    const stops = await Stop.find({
      trip_id: tripId,
    }).sort({
      order: 1,
    });

    res.status(200).json({
      success: true,
      stops,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};




// UPDATE STOP
exports.updateStop = async (req, res) => {

  try {

    const stop = await Stop.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Stop updated successfully",
      stop,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};




// DELETE STOP
exports.deleteStop = async (req, res) => {

  try {

    await Stop.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: "Stop deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};