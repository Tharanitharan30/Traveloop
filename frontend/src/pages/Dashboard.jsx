import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaPlaneDeparture } from "react-icons/fa";
import { Link } from "react-router-dom";
import API from "../api/api";
import Layout from "../components/Layout";
import TripCard from "../components/TripCard";

function Dashboard() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setTrips([]);
        setError("Please log in to view your trips.");
        setLoading(false);
        return;
      }

      const res = await API.get("/trips", {
        headers: {
          Authorization: `${token}`,
        },
      });

      setTrips(res.data?.trips || []);
    } catch (error) {
      console.log(error);
      setError(
        error.response?.data?.message || "Unable to load trips right now."
      );
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <Layout>
      <div className="mb-10 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Your Trips</h2>
          <p className="text-slate-400 text-sm">Manage and organize all your adventures in one place.</p>
        </div>
        <Link to="/create-trip" className="btn-primary py-2.5 text-sm flex items-center gap-2">
          <FaPlaneDeparture />
          <span>New Trip</span>
        </Link>
      </div>

      {loading ? (
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse rounded-3xl bg-white/5 h-[360px] border border-white/5" />
          ))}
        </div>
      ) : error ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel border-red-500/30 bg-red-500/10 p-8 text-center rounded-3xl"
        >
          <p className="text-red-200 text-lg font-medium mb-4">{error}</p>
          <Link to="/" className="text-primary-400 hover:underline text-sm font-semibold">
            Return to Login
          </Link>
        </motion.div>
      ) : trips.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-16 text-center rounded-3xl flex flex-col items-center justify-center border-dashed border-2 border-white/20"
        >
          <div className="w-20 h-20 bg-primary-500/20 rounded-full flex items-center justify-center mb-6">
            <FaPlaneDeparture className="text-3xl text-primary-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">No trips planned yet</h3>
          <p className="text-slate-400 max-w-md mb-8 leading-relaxed">
            It looks like your itinerary is empty. Time to start dreaming about your next great adventure!
          </p>
          <Link to="/create-trip" className="btn-primary">
            Plan a New Trip
          </Link>
        </motion.div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="
            grid
            gap-8
            md:grid-cols-2
            xl:grid-cols-3
            2xl:grid-cols-4
          "
        >
          {trips.map((trip) => (
            <motion.div key={trip._id} variants={itemVariants}>
              <TripCard trip={trip} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </Layout>
  );
}

export default Dashboard;
