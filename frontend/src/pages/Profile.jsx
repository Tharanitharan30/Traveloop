import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaSignOutAlt, FaUserCircle, FaEnvelope, FaShieldAlt } from "react-icons/fa";
import Layout from "../components/Layout";

function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-8 sm:p-10 rounded-[2rem] border border-white/10"
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center shadow-lg shadow-primary-500/20">
                <FaUserCircle className="text-3xl text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-1">Profile</h1>
                <p className="text-slate-400">Manage your account and log out when you’re done.</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="inline-flex w-fit items-center gap-2 px-5 py-3 rounded-xl bg-red-500/15 text-red-300 hover:bg-red-500/25 transition-colors font-semibold"
            >
              <FaSignOutAlt /> Log Out
            </button>
          </div>

          <div className="grid gap-4 mt-10 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/5 bg-slate-900/50 p-5">
              <div className="flex items-center gap-3 text-slate-400 text-sm mb-2">
                <FaUserCircle className="text-primary-400" /> Username
              </div>
              <p className="text-xl font-semibold text-white">{user?.username || "Guest"}</p>
            </div>

            <div className="rounded-2xl border border-white/5 bg-slate-900/50 p-5">
              <div className="flex items-center gap-3 text-slate-400 text-sm mb-2">
                <FaEnvelope className="text-secondary-400" /> Email
              </div>
              <p className="text-xl font-semibold text-white break-all">{user?.email || "Not available"}</p>
            </div>

            <div className="rounded-2xl border border-white/5 bg-slate-900/50 p-5 sm:col-span-2">
              <div className="flex items-center gap-3 text-slate-400 text-sm mb-2">
                <FaShieldAlt className="text-emerald-400" /> Session
              </div>
              <p className="text-lg font-medium text-slate-200">
                You are currently signed in and can safely end the session using the logout button.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}

export default Profile;