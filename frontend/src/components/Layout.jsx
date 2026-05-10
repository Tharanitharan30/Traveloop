import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { motion } from "framer-motion";

function Layout({ children }) {
  return (
    <div className="
      min-h-screen
      bg-slate-950
      text-white
      relative
      overflow-hidden
      font-sans
    ">

      {/* Animated Background Glow Effects */}
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
        className="
          fixed
          top-[-10%]
          right-[-5%]
          w-[600px]
          h-[600px]
          bg-primary-600/20
          blur-[120px]
          rounded-full
          z-0
          pointer-events-none
        "
      />

      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1 
        }}
        className="
          fixed
          bottom-[-10%]
          left-[-10%]
          w-[600px]
          h-[600px]
          bg-secondary-500/20
          blur-[120px]
          rounded-full
          z-0
          pointer-events-none
        "
      />

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="
        ml-[260px]
        min-h-screen
        relative
        z-10
        flex
        flex-col
      ">

        {/* Top Navbar */}
        <div className="
          sticky
          top-0
          z-50
          backdrop-blur-xl
          bg-slate-950/70
          border-b
          border-white/5
          px-10
          py-5
          shadow-sm
        ">
          <Navbar />
        </div>

        {/* Page Content */}
        <main className="
          p-10
          flex-grow
          w-full
          max-w-[1600px]
          mx-auto
        ">
          {children}
        </main>

      </div>
    </div>
  );
}

export default Layout;