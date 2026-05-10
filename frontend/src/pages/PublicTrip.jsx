import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaCalendarAlt, FaClock, FaTag, FaMoneyBillWave } from "react-icons/fa";
import API from "../api/api";

function PublicTrip() {
  const { shareToken } = useParams();
  const [tripData, setTripData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTrip();
  }, []);

  const fetchTrip = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await API.get(`/public/${shareToken}`);
      setTripData(res.data);
    } catch (error) {
      setTripData(null);
      setError(error.response?.data?.message || "Unable to load this public trip. It may be private or deleted.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "TBD";
    return new Date(dateString).toLocaleDateString(undefined, {
      month: 'short', day: 'numeric', year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
          <p className="text-slate-400 font-medium tracking-wide animate-pulse">Loading adventure...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-10 text-white relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-500/10 blur-[100px] rounded-full pointer-events-none" />
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 max-w-lg w-full rounded-3xl border border-red-500/20 bg-slate-900/80 backdrop-blur-xl p-10 text-center shadow-2xl"
        >
          <div className="w-20 h-20 bg-red-500/20 text-red-400 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">!</div>
          <h1 className="mb-4 text-2xl font-bold">Trip Unavailable</h1>
          <p className="text-slate-400">{error}</p>
        </motion.div>
      </div>
    );
  }

  const trip = tripData?.trip;
  const itinerary = tripData?.itinerary || [];

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans relative overflow-x-hidden">
      {/* Dynamic Background */}
      <div className="fixed top-0 inset-x-0 h-screen w-full pointer-events-none z-0">
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-primary-600/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[800px] h-[800px] bg-secondary-600/10 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12 lg:px-8">
        
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 overflow-hidden rounded-[2.5rem] border border-white/10 bg-slate-900/50 backdrop-blur-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]"
        >
          <div className="relative h-80 sm:h-96 w-full">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent z-10" />
            <img
              src={trip?.cover_photo || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200"}
              alt={trip?.name || "Trip cover"}
              className="h-full w-full object-cover"
            />
            
            <div className="absolute bottom-0 left-0 w-full p-8 sm:p-12 z-20">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                <FaGlobe className="text-primary-400" /> Public Trip
              </div>
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-4 text-white drop-shadow-lg">
                {trip?.name || "Untitled Adventure"}
              </h1>
              {trip?.description && (
                <p className="text-lg sm:text-xl text-slate-300 max-w-3xl drop-shadow-md leading-relaxed">
                  {trip.description}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10 border-t border-white/10 bg-slate-900/80">
            <div className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary-500/20 text-primary-400 flex items-center justify-center text-xl">
                <FaCalendarAlt />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Start Date</p>
                <p className="text-lg font-semibold text-slate-200">{formatDate(trip?.start_date)}</p>
              </div>
            </div>
            <div className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-secondary-500/20 text-secondary-400 flex items-center justify-center text-xl">
                <FaCalendarAlt />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">End Date</p>
                <p className="text-lg font-semibold text-slate-200">{formatDate(trip?.end_date)}</p>
              </div>
            </div>
            <div className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xl">
                <FaMapMarkerAlt />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Stops</p>
                <p className="text-lg font-semibold text-slate-200">{itinerary.length} Destinations</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Itinerary Timeline */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center">The Itinerary</h2>

          {itinerary.length === 0 ? (
            <div className="glass-panel p-10 text-center rounded-3xl">
              <p className="text-slate-400 text-lg">The itinerary is currently empty.</p>
            </div>
          ) : (
            <div className="space-y-12">
              {itinerary.map((item, index) => (
                <motion.div
                  key={item.stop?._id || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-8 sm:pl-0"
                >
                  <div className="glass-panel p-8 rounded-3xl hover:border-primary-500/30 transition-all duration-500 group">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-600 to-secondary-600 flex items-center justify-center text-xl font-bold shadow-lg">
                          {index + 1}
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-white group-hover:text-primary-400 transition-colors">
                            {item.stop?.city_name || "Unnamed stop"}
                          </h2>
                          <div className="flex items-center gap-2 text-sm text-slate-400 mt-1">
                            <FaMapMarkerAlt /> {item.stop?.country || "Location not set"}
                          </div>
                        </div>
                      </div>
                    </div>

                    {!item.activities?.length ? (
                      <div className="bg-slate-900/50 rounded-2xl p-6 text-slate-400 text-center border border-white/5">
                        No specific activities planned for this stop yet.
                      </div>
                    ) : (
                      <div className="grid gap-4 sm:grid-cols-2">
                        {item.activities.map((activity, actIdx) => (
                          <div
                            key={activity._id || `${index}-${activity.name}-${actIdx}`}
                            className="bg-slate-800/40 border border-white/5 rounded-2xl p-5 hover:bg-slate-800/60 transition-colors"
                          >
                            <h3 className="text-lg font-bold text-white mb-3">
                              {activity.name}
                            </h3>
                            
                            <div className="space-y-2 text-sm text-slate-300">
                              {activity.category && (
                                <div className="flex items-center gap-2">
                                  <FaTag className="text-primary-500" /> {activity.category}
                                </div>
                              )}
                              <div className="flex items-center gap-2">
                                <FaClock className="text-secondary-500" /> {activity.time_slot || "Flexible time"}
                              </div>
                              {activity.cost > 0 && (
                                <div className="flex items-center gap-2">
                                  <FaMoneyBillWave className="text-emerald-500" /> ₹{activity.cost}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Ensure FaGlobe is available for the public badge
import { FaGlobe } from "react-icons/fa";

export default PublicTrip;

