import {
  FaHome,
  FaMapMarkedAlt,
  FaWallet,
  FaGlobe,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

function Sidebar() {
  const location = useLocation();

  const links = [
    { name: "Dashboard", path: "/dashboard", icon: FaHome },
    { name: "Create Trip", path: "/create-trip", icon: FaMapMarkedAlt },
    { name: "Budget", path: "/budget", icon: FaWallet },
    { name: "Public Trips", path: "/public/demo", icon: FaGlobe },
  ];

  return (
    <div className="
      w-[260px]
      h-screen
      bg-slate-900/40
      backdrop-blur-xl
      border-r
      border-white/5
      fixed
      left-0
      top-0
      p-6
      flex
      flex-col
      shadow-[4px_0_24px_rgba(0,0,0,0.2)]
      z-20
    ">
      <div className="flex items-center gap-3 mb-12 px-2">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center shadow-lg shadow-primary-500/30">
          <FaGlobe className="text-white text-xl" />
        </div>
        <h1 className="
          text-2xl
          font-bold
          bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400
        ">
          Traveloop
        </h1>
      </div>

      <nav className="flex flex-col gap-2 relative">
        {links.map((link) => {
          const isActive = location.pathname.startsWith(link.path.split('/')[1] ? `/${link.path.split('/')[1]}` : link.path);
          const Icon = link.icon;

          return (
            <Link
              key={link.name}
              to={link.path}
              className={`
                relative
                flex
                items-center
                gap-4
                px-4
                py-3
                rounded-xl
                transition-all
                duration-300
                group
                overflow-hidden
                ${isActive ? 'text-white' : 'text-slate-400 hover:text-white'}
              `}
            >
              {isActive && (
                <motion.div
                  layoutId="active-nav"
                  className="absolute inset-0 bg-white/10 rounded-xl border border-white/10"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              
              <div className="relative z-10 flex items-center gap-4">
                <Icon className={`text-xl transition-colors ${isActive ? 'text-primary-500' : 'group-hover:text-primary-400'}`} />
                <span className="font-medium">{link.name}</span>
              </div>

              {/* Active Indicator Line */}
              {isActive && (
                <motion.div 
                  layoutId="active-indicator"
                  className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-primary-500 rounded-r-full" 
                />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto px-4 py-4 rounded-xl bg-gradient-to-br from-primary-900/40 to-slate-900/40 border border-primary-500/20">
        <p className="text-sm text-slate-300 font-medium mb-1">Need Help?</p>
        <p className="text-xs text-slate-500 mb-3">Check our documentation or contact support.</p>
        <button className="text-xs font-semibold text-primary-400 hover:text-primary-300 transition-colors">
          View Docs &rarr;
        </button>
      </div>
    </div>
  );
}

export default Sidebar;