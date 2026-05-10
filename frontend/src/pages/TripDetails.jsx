import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaCalendarAlt, FaClock, FaTag, FaMoneyBillWave, FaArrowLeft, FaShareAlt, FaPlus, FaChartPie, FaTrash } from "react-icons/fa";
import API from "../api/api";
import Layout from "../components/Layout";

function TripDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [itinerary, setItinerary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchTripDetails();
  }, [id]);

  const fetchTripDetails = async () => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `${token}` };

      // Fetch Trip
      const tripRes = await API.get(`/trips/${id}`, { headers });
      const currentTrip = tripRes.data.trip;
      setTrip(currentTrip);

      // Fetch Stops
      const stopsRes = await API.get(`/stops/${id}`, { headers });
      const stops = stopsRes.data.stops || [];

      // Fetch Activities for each stop
      const itineraryData = await Promise.all(
        stops.map(async (stop) => {
          try {
            const actRes = await API.get(`/activities/${stop._id}`, { headers });
            return { stop, activities: actRes.data.activities || [] };
          } catch (e) {
            console.error(`Failed to fetch activities for stop ${stop._id}`, e);
            return { stop, activities: [] };
          }
        })
      );

      setItinerary(itineraryData);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load trip details.");
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

  const handleCopyShareLink = () => {
    if (trip?.share_token) {
      const url = `${window.location.origin}/public/${trip.share_token}`;
      navigator.clipboard.writeText(url);
      alert("Public link copied to clipboard!");
    }
  };

  const handleDeleteTrip = async () => {
    const confirmed = window.confirm(
      "Delete this trip? This will remove the trip and its related data."
    );

    if (!confirmed) {
      return;
    }

    setDeleting(true);

    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `${token}` };

      await API.delete(`/trips/${id}`, { headers });
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete trip.");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
            <p className="text-slate-400 font-medium animate-pulse">Loading trip details...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] max-w-lg mx-auto">
          <div className="glass-panel p-8 rounded-3xl text-center border-red-500/20 w-full">
            <div className="w-16 h-16 bg-red-500/20 text-red-400 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">!</div>
            <h2 className="text-xl font-bold text-white mb-2">Failed to Load</h2>
            <p className="text-slate-400 mb-6">{error}</p>
            <Link to="/dashboard" className="btn-primary inline-flex items-center gap-2">
              <FaArrowLeft /> Back to Dashboard
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header Navigation */}
        <div className="flex items-center justify-between">
          <Link to="/dashboard" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <FaArrowLeft /> Back to Dashboard
          </Link>
          <div className="flex gap-3">
            {trip.is_public && (
              <button 
                onClick={handleCopyShareLink}
                className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-xl text-sm font-medium transition-colors"
              >
                <FaShareAlt /> Share
              </button>
            )}
            <Link to={`/budget?tripId=${id}`} className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-xl text-sm font-medium transition-colors">
              <FaChartPie className="text-purple-400" /> Analyze Budget
            </Link>
            <Link to={`/itinerary-builder?tripId=${id}`} className="btn-primary px-4 py-2 text-sm flex items-center gap-2">
              <FaPlus /> Add Stop
            </Link>
            <button
              onClick={handleDeleteTrip}
              disabled={deleting}
              className="inline-flex items-center gap-2 bg-red-500/15 hover:bg-red-500/25 text-red-300 px-4 py-2 rounded-xl text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FaTrash /> {deleting ? "Deleting..." : "Delete Trip"}
            </button>
          </div>
        </div>

        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-slate-900/50 backdrop-blur-md"
        >
          <div className="relative h-64 sm:h-80 w-full">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent z-10" />
            <img
              src={trip?.cover_photo || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200"}
              alt={trip?.name}
              className="h-full w-full object-cover"
            />
            
            <div className="absolute bottom-0 left-0 w-full p-8 z-20">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white drop-shadow-lg mb-2">
                {trip?.name || "Untitled Trip"}
              </h1>
              {trip?.description && (
                <p className="text-lg text-slate-300 drop-shadow max-w-2xl">
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
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</p>
                <p className="text-lg font-semibold text-slate-200">{trip?.is_public ? 'Public' : 'Private'}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Itinerary Timeline */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">Your Itinerary</h2>
          </div>

          {itinerary.length === 0 ? (
            <div className="glass-panel p-10 text-center rounded-3xl">
              <p className="text-slate-400 text-lg mb-4">You haven't added any stops to this trip yet.</p>
              <Link to="/itinerary-builder" className="btn-primary inline-flex items-center gap-2">
                <FaPlus /> Start Planning
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {itinerary.map((item, index) => (
                <motion.div
                  key={item.stop?._id || index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-panel p-6 sm:p-8 rounded-3xl"
                >
                  <div className="flex items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-600 to-secondary-600 flex items-center justify-center text-lg font-bold shadow-lg">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">
                          {item.stop?.city_name || "Unnamed City"}
                        </h3>
                        <p className="text-sm text-slate-400 flex items-center gap-1 mt-1">
                          <FaMapMarkerAlt /> {item.stop?.country || "Country"}
                        </p>
                      </div>
                    </div>
                    <Link to={`/activities?stopId=${item.stop._id}`} className="text-primary-400 hover:text-primary-300 text-sm font-medium">
                      + Add Activity
                    </Link>
                  </div>

                  {!item.activities?.length ? (
                    <div className="bg-slate-900/50 rounded-2xl p-6 text-slate-500 text-center text-sm border border-white/5">
                      No activities planned here yet.
                    </div>
                  ) : (
                    <div className="grid gap-4 sm:grid-cols-2">
                      {item.activities.map((activity, actIdx) => (
                        <div
                          key={activity._id || actIdx}
                          className="bg-slate-800/40 border border-white/5 rounded-2xl p-5 hover:border-primary-500/30 transition-colors"
                        >
                          <h4 className="font-bold text-white mb-3">{activity.name}</h4>
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
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default TripDetails;
