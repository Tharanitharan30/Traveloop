const Trip = require("../models/Trip");
const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");


// CREATE TRIP
exports.createTrip = async (req, res) => {

  try {

    const {
      name,
      description,
      start_date,
      end_date,
      cover_photo,
      is_public,
    } = req.body;

    const trip = await Trip.create({

      user_id: req.user.id,

      name,
      description,
      start_date,
      end_date,

      cover_photo,

      is_public,

      share_token: uuidv4(),

    });

    res.status(201).json({
      success: true,
      message: "Trip created successfully",
      trip,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};




// GET ALL USER TRIPS
exports.getTrips = async (req, res) => {

  try {

    const trips = await Trip.find({
      user_id: req.user.id,
    }).sort({
      created_at: -1,
    });

    res.status(200).json({
      success: true,
      trips,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};




// GET SINGLE TRIP
exports.getSingleTrip = async (req, res) => {
    
   if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
  return res.status(400).json({
    success: false,
    message: "Invalid Trip ID",
  });
}

  try {

    const trip = await Trip.findById(
      req.params.id
    );

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

    res.status(200).json({
      success: true,
      trip,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};




// UPDATE TRIP
exports.updateTrip = async (req, res) => {

  try {

    const trip = await Trip.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Trip updated successfully",
      trip,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};




// DELETE TRIP
exports.deleteTrip = async (req, res) => {

  try {

    await Trip.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: "Trip deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};