import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaMoneyBillWave, FaClock, FaChartPie, FaMapMarkerAlt, FaChevronDown } from "react-icons/fa";
import API from "../api/api";
import Layout from "../components/Layout";

function BudgetDashboard() {
  const [searchParams] = useSearchParams();
  const queryTripId = searchParams.get("tripId");

  const [tripId, setTripId] = useState(queryTripId || "");
  const [trips, setTrips] = useState([]);
  const [budgetData, setBudgetData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch all user trips for the dropdown
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get("/trips", {
          headers: { Authorization: `${token}` },
        });
        setTrips(res.data?.trips || []);
      } catch (err) {
        console.error("Failed to load trips for dropdown", err);
      }
    };
    fetchTrips();
  }, []);

  useEffect(() => {
    if (queryTripId) {
      getBudget(queryTripId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryTripId]);

  const getBudget = async (idToFetch = tripId) => {
    if (typeof idToFetch !== "string" || !idToFetch.trim()) return;
    
    setLoading(true);
    setError("");
    setBudgetData(null);

    try {
      const token = localStorage.getItem("token");
      const res = await API.get(`/budget/${idToFetch}`, {
        headers: { Authorization: `${token}` },
      });
      setBudgetData(res.data);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch budget data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-white mb-2">Budget Analysis</h2>
        <p className="text-slate-400">Analyze the financial breakdown of your trips.</p>
      </div>

      <div className="glass-panel p-6 rounded-3xl mb-10 flex flex-col md:flex-row gap-4 items-center max-w-2xl">
        <div className="relative flex-grow w-full">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10" />
          <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10" />
          <select
            value={tripId}
            onChange={(e) => {
              setTripId(e.target.value);
              // Optionally auto-fetch when selected from dropdown:
              // getBudget(e.target.value);
            }}
            className="glass-input w-full !pl-11 !pr-10 appearance-none bg-slate-900/80 cursor-pointer"
          >
            <option value="" disabled>Select a Trip to analyze...</option>
            {trips.map(t => (
              <option key={t._id} value={t._id} className="bg-slate-900 text-white">
                {t.name}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={() => getBudget(tripId)}
          disabled={loading || !tripId.trim()}
          className={`btn-primary whitespace-nowrap ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Analyzing...' : 'Analyze Budget'}
        </button>
      </div>

      {error && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-500/10 border border-red-500/20 text-red-400 p-6 rounded-2xl mb-8 max-w-2xl"
        >
          {error}
        </motion.div>
      )}

      <AnimatePresence>
        {budgetData && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="glass-panel p-8 rounded-3xl border-l-4 border-l-primary-500 relative overflow-hidden">
              <div className="absolute top-[-50%] right-[-10%] w-64 h-64 bg-primary-500/10 blur-[80px] rounded-full pointer-events-none" />
              
              <h2 className="text-3xl font-bold text-white mb-8">
                {budgetData.trip_name}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-900/50 border border-white/5 p-6 rounded-2xl flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <FaMoneyBillWave className="text-2xl" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-400">Total Budget</p>
                    <p className="text-2xl font-bold text-white">₹{budgetData.total_budget}</p>
                  </div>
                </div>

                <div className="bg-slate-900/50 border border-white/5 p-6 rounded-2xl flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                    <FaClock className="text-2xl" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-400">Total Days</p>
                    <p className="text-2xl font-bold text-white">{budgetData.total_days}</p>
                  </div>
                </div>

                <div className="bg-slate-900/50 border border-white/5 p-6 rounded-2xl flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                    <FaChartPie className="text-2xl" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-400">Avg Per Day</p>
                    <p className="text-2xl font-bold text-white">₹{budgetData.average_per_day.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <FaMapMarkerAlt className="text-primary-500" /> Stop Breakdown
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {budgetData.stop_breakdown.map((stop, index) => (
                  <motion.div
                    key={stop.stop_id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-panel p-6 rounded-2xl hover:border-primary-500/30 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-lg font-bold text-white">{stop.city_name}</h4>
                      <span className="bg-primary-500/20 text-primary-400 text-xs font-bold px-2 py-1 rounded-md">
                        {stop.activity_count} Activities
                      </span>
                    </div>
                    
                    <div className="pt-4 border-t border-white/10 flex justify-between items-end">
                      <span className="text-sm text-slate-400">Allocated Cost</span>
                      <span className="text-xl font-bold text-white">₹{stop.total_cost}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}

export default BudgetDashboard;

