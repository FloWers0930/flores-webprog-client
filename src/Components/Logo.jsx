function Logo() {
  return (
    <div className="flex items-center gap-4">
      {/* Modern logo with hover effect */}
      <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-[#4a5c4a] shadow-md hover:shadow-lg transition-shadow duration-300">
        <img 
          src="/images/Logo.png" 
          alt="LF Logo" 
          className="w-10 h-10 object-contain transform hover:scale-110 transition-transform duration-300"
        />
      </div>
      {/* Optional text for branding */}
      <span className="font-[Syne] text-xl font-bold text-[#4a5c4a]">
        LF Studio
      </span>
    </div>
  )
}

export default Logo;