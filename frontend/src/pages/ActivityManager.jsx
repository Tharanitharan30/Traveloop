import { useState } from "react";
import { motion } from "framer-motion";
import API from "../api/api";
import Layout from "../components/Layout";

function ActivityManager() {
  const [formData, setFormData] = useState({
    stop_id: "",
    name: "",
    category: "",
    cost: "",
    duration_hours: "",
    time_slot: "",
    notes: "",
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in.");
        setLoading(false);
        return;
      }

      const res = await API.post("/activities", formData, {
        headers: { Authorization: `${token}` },
      });

      setSuccess(res.data.message || "Activity added successfully!");
      // Optionally reset form here
    } catch (error) {
      setError(error.response?.data?.message || "Failed to add activity.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Add Activity</h1>
          <p className="text-slate-400">Log a new activity for a specific stop in your itinerary.</p>
        </div>

        <div className="glass-panel p-8 md:p-10 rounded-3xl">
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl mb-6 text-sm"
            >
              {error}
            </motion.div>
          )}

          {success && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-3 rounded-xl mb-6 text-sm"
            >
              {success}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-300 ml-1">Stop ID *</label>
                <input
                  type="text"
                  name="stop_id"
                  placeholder="ID of the associated stop"
                  value={formData.stop_id}
                  onChange={handleChange}
                  className="glass-input"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-300 ml-1">Category</label>
                <input
                  type="text"
                  name="category"
                  placeholder="e.g. Sightseeing, Food"
                  value={formData.category}
                  onChange={handleChange}
                  className="glass-input"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-300 ml-1">Activity Name *</label>
              <input
                type="text"
                name="name"
                placeholder="What will you do?"
                value={formData.name}
                onChange={handleChange}
                className="glass-input"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-300 ml-1">Cost (₹)</label>
                <input
                  type="number"
                  name="cost"
                  placeholder="0.00"
                  value={formData.cost}
                  onChange={handleChange}
                  className="glass-input"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-300 ml-1">Duration (Hrs)</label>
                <input
                  type="number"
                  step="0.5"
                  name="duration_hours"
                  placeholder="2.5"
                  value={formData.duration_hours}
                  onChange={handleChange}
                  className="glass-input"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-300 ml-1">Time Slot</label>
                <input
                  type="text"
                  name="time_slot"
                  placeholder="e.g. Morning, 14:00"
                  value={formData.time_slot}
                  onChange={handleChange}
                  className="glass-input"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-300 ml-1">Notes</label>
              <textarea
                name="notes"
                placeholder="Any additional details..."
                value={formData.notes}
                onChange={handleChange}
                className="glass-input min-h-[100px] resize-y"
              />
            </div>

            <div className="mt-4 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className={`btn-primary px-8 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Adding...' : 'Add Activity'}
              </button>
            </div>

          </form>
        </div>
      </motion.div>
    </Layout>
  );
}

export default ActivityManager;
