const Activity = require("../models/Activity");
const mongoose = require("mongoose");



// CREATE ACTIVITY
exports.createActivity = async (req, res) => {

  try {

    const {
      stop_id,
      name,
      category,
      cost,
      duration_hours,
      time_slot,
      notes,
    } = req.body;

    const activity = await Activity.create({
      stop_id,
      name,
      category,
      cost,
      duration_hours,
      time_slot,
      notes,
    });

    res.status(201).json({
      success: true,
      message: "Activity added successfully",
      activity,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};




// GET ACTIVITIES BY STOP
exports.getActivitiesByStop = async (
  req,
  res
) => {

  try {

    const { stopId } = req.params;

    if (
      !mongoose.Types.ObjectId.isValid(stopId)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid Stop ID",
      });
    }

    const activities = await Activity.find({
      stop_id: stopId,
    });

    res.status(200).json({
      success: true,
      activities,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};




// UPDATE ACTIVITY
exports.updateActivity = async (
  req,
  res
) => {

  try {

    const activity =
      await Activity.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    res.status(200).json({
      success: true,
      message: "Activity updated successfully",
      activity,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};




// DELETE ACTIVITY
exports.deleteActivity = async (
  req,
  res
) => {

  try {

    await Activity.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: "Activity deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};