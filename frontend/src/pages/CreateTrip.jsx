import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import Layout from "../components/Layout";

function CreateTrip() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    start_date: "",
    end_date: "",
    cover_photo: "",
    is_public: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in to create a trip.");
        setLoading(false);
        return;
      }

      await API.post("/trips", formData, {
        headers: { Authorization: `${token}` },
      });

      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Failed to create trip.");
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
          <h1 className="text-3xl font-bold text-white mb-2">Create a New Trip</h1>
          <p className="text-slate-400">Where are you heading next? Fill in the details to start planning.</p>
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

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-300 ml-1">Trip Name *</label>
              <input
                type="text"
                name="name"
                placeholder="e.g. Summer in Kyoto"
                value={formData.name}
                onChange={handleChange}
                className="glass-input"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-300 ml-1">Description</label>
              <textarea
                name="description"
                placeholder="What is the purpose of this trip?"
                value={formData.description}
                onChange={handleChange}
                className="glass-input min-h-[100px] resize-y"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-300 ml-1">Start Date *</label>
                <input
                  type="date"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleChange}
                  className="glass-input [color-scheme:dark]"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-300 ml-1">End Date *</label>
                <input
                  type="date"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleChange}
                  className="glass-input [color-scheme:dark]"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-300 ml-1">Cover Photo URL</label>
              <input
                type="url"
                name="cover_photo"
                placeholder="https://example.com/image.jpg"
                value={formData.cover_photo}
                onChange={handleChange}
                className="glass-input"
              />
            </div>

            <div className="flex items-center gap-3 mt-2 bg-slate-900/30 p-4 rounded-xl border border-white/5">
              <input
                type="checkbox"
                name="is_public"
                id="is_public"
                checked={formData.is_public}
                onChange={handleChange}
                className="w-5 h-5 rounded border-slate-600 bg-slate-900 text-primary-500 focus:ring-primary-500/50"
              />
              <div>
                <label htmlFor="is_public" className="text-sm font-medium text-white block cursor-pointer">
                  Make Trip Public
                </label>
                <p className="text-xs text-slate-400">Allow others to view your itinerary if you share the link.</p>
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-4">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="px-6 py-3 rounded-xl font-medium text-slate-300 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`btn-primary px-8 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Creating...' : 'Create Trip'}
              </button>
            </div>

          </form>
        </div>
      </motion.div>
    </Layout>
  );
}

export default CreateTrip;
