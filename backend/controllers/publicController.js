const Trip = require("../models/Trip");
const Stop = require("../models/Stop");
const Activity = require("../models/Activity");



// GET PUBLIC TRIP
exports.getPublicTrip = async (
  req,
  res
) => {

  try {

    const { shareToken } = req.params;

    // find public trip
    const trip = await Trip.findOne({
      share_token: shareToken,
      is_public: true,
    });

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Public trip not found",
      });
    }

    // get stops
    const stops = await Stop.find({
      trip_id: trip._id,
    }).sort({
      order: 1,
    });

    // attach activities
    const itinerary = [];

    for (const stop of stops) {

      const activities =
        await Activity.find({
          stop_id: stop._id,
        });

      itinerary.push({
        stop,
        activities,
      });
    }

    res.status(200).json({
      success: true,
      trip,
      itinerary,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

exports.copyTrip = async (
  req,
  res
) => {

  try {

    const { shareToken } = req.params;

    // find public trip
    const originalTrip =
      await Trip.findOne({
        share_token: shareToken,
        is_public: true,
      });

    if (!originalTrip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

    // create copied trip
    const copiedTrip =
      await Trip.create({

        user_id: req.user.id,

        name:
          originalTrip.name +
          " (Copy)",

        description:
          originalTrip.description,

        start_date:
          originalTrip.start_date,

        end_date:
          originalTrip.end_date,

        cover_photo:
          originalTrip.cover_photo,

        is_public: false,

        share_token:
          crypto.randomUUID(),

      });

    // copy stops
    const originalStops =
      await Stop.find({
        trip_id: originalTrip._id,
      });

    for (const stop of originalStops) {

      const newStop =
        await Stop.create({

          trip_id: copiedTrip._id,

          city_name:
            stop.city_name,

          country:
            stop.country,

          country_code:
            stop.country_code,

          order:
            stop.order,

          start_date:
            stop.start_date,

          end_date:
            stop.end_date,

        });

      // copy activities
      const activities =
        await Activity.find({
          stop_id: stop._id,
        });

      for (const activity of activities) {

        await Activity.create({

          stop_id: newStop._id,

          name:
            activity.name,

          category:
            activity.category,

          cost:
            activity.cost,

          duration_hours:
            activity.duration_hours,

          time_slot:
            activity.time_slot,

          notes:
            activity.notes,

        });
      }
    }

    res.status(201).json({
      success: true,
      message:
        "Trip copied successfully",
      copiedTrip,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};