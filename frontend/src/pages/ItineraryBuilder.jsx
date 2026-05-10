import { useState } from "react";
import { motion } from "framer-motion";
// useNavigate not needed in this component
import API from "../api/api";
import Layout from "../components/Layout";

function ItineraryBuilder() {
  // navigate not used
  const [formData, setFormData] = useState({
    trip_id: "",
    city_name: "",
    country: "",
    country_code: "",
    order: 1,
    start_date: "",
    end_date: "",
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

      const res = await API.post("/stops", formData, {
        headers: { Authorization: `${token}` },
      });

      setSuccess(res.data.message || "Stop added successfully!");
      // Optionally reset form
    } catch (error) {
      setError(error.response?.data?.message || "Failed to add stop.");
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
          <h1 className="text-3xl font-bold text-white mb-2">Build Itinerary</h1>
          <p className="text-slate-400">Add a new destination stop to your trip.</p>
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
                <label className="text-sm font-medium text-slate-300 ml-1">Trip ID *</label>
                <input
                  type="text"
                  name="trip_id"
                  placeholder="ID of the trip"
                  value={formData.trip_id}
                  onChange={handleChange}
                  className="glass-input"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-300 ml-1">Order *</label>
                <input
                  type="number"
                  name="order"
                  placeholder="e.g. 1"
                  value={formData.order}
                  onChange={handleChange}
                  className="glass-input"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-300 ml-1">City Name *</label>
                <input
                  type="text"
                  name="city_name"
                  placeholder="e.g. Tokyo"
                  value={formData.city_name}
                  onChange={handleChange}
                  className="glass-input"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-300 ml-1">Country</label>
                <input
                  type="text"
                  name="country"
                  placeholder="e.g. Japan"
                  value={formData.country}
                  onChange={handleChange}
                  className="glass-input"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-300 ml-1">Country Code</label>
                <input
                  type="text"
                  name="country_code"
                  placeholder="e.g. JP"
                  value={formData.country_code}
                  onChange={handleChange}
                  className="glass-input"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-300 ml-1">Arrival Date</label>
                <input
                  type="date"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleChange}
                  className="glass-input [color-scheme:dark]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-300 ml-1">Departure Date</label>
                <input
                  type="date"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleChange}
                  className="glass-input [color-scheme:dark]"
                />
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className={`btn-primary px-8 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Adding...' : 'Add Stop'}
              </button>
            </div>

          </form>
        </div>
      </motion.div>
    </Layout>
  );
}

export default ItineraryBuilder;
