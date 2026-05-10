function Navbar() {
  const user = JSON.parse(
    localStorage.getItem("user") || '{"username": "Guest"}'
  );

  return (
    <div className="
      flex
      justify-between
      items-center
      mb-2
    ">
      <div>
        <h1 className="
          text-3xl
          font-bold
          tracking-tight
          text-white
          mb-1
        ">
          Welcome back, {user?.username} <span className="animate-wave inline-block origin-[70%_70%]">👋</span>
        </h1>
        <p className="text-slate-400 text-sm font-medium">
          Ready to plan your next adventure?
        </p>
      </div>

      <div className="flex items-center gap-4">
        {/* Subtle notification or action area could go here */}
        
        <div className="
          flex items-center gap-3
          bg-slate-800/50
          border border-white/5
          px-2
          py-1.5
          pr-4
          rounded-full
          hover:bg-slate-800
          transition-colors
          cursor-pointer
        ">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary-500 to-secondary-500 flex items-center justify-center text-sm font-bold text-white shadow-inner">
            {user?.username?.charAt(0).toUpperCase()}
          </div>
          <span className="text-sm font-medium text-slate-200">
            {user?.username}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Navbar;