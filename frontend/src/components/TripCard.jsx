import { motion } from "framer-motion";
import { FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

function TripCard({ trip }) {
  // Format dates gracefully
  const formatDate = (dateString) => {
    if (!dateString) return "TBD";
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Link to={`/trips/${trip._id}`} className="block">
      <motion.div
        whileHover={{ y: -8 }}
        className="
          group
          relative
          rounded-3xl
          overflow-hidden
          cursor-pointer
          bg-slate-900/50
          border border-white/10
          hover:border-primary-500/50
          shadow-[0_8px_30px_rgb(0,0,0,0.2)]
          hover:shadow-[0_20px_40px_rgba(14,165,233,0.15)]
          transition-all
          duration-500
        "
      >
        {/* Holographic Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-linear-to-br from-primary-500/10 via-transparent to-secondary-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />

        {/* Image Container with Zoom Effect */}
        <div className="relative h-[240px] overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/20 to-transparent z-10" />
          <motion.img
            src={trip.cover_photo || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800"}
            alt={trip.name}
            className="
              w-full
              h-full
              object-cover
              transition-transform
              duration-700
              group-hover:scale-110
            "
          />
          
          {/* Floating Badge (Example) */}
          <div className="absolute top-4 right-4 z-20 bg-black/40 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-xs font-semibold text-white">
            Upcoming
          </div>
        </div>

        <div className="p-6 relative z-20 -mt-10">
          <h2 className="
            text-2xl
            font-bold
            text-white
            mb-2
            line-clamp-1
            group-hover:text-primary-400
            transition-colors
          ">
            {trip.name}
          </h2>

          <p className="
            text-slate-400
            text-sm
            mb-6
            line-clamp-2
            leading-relaxed
          ">
            {trip.description || "No description provided for this adventure."}
          </p>

          <div className="
            flex
            justify-between
            items-center
            text-xs
            font-medium
            text-slate-300
            pt-4
            border-t
            border-white/10
          ">
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-primary-500" />
              <span>{formatDate(trip.start_date)}</span>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
            <div className="flex items-center gap-2">
              <span>{formatDate(trip.end_date)}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export default TripCard;
