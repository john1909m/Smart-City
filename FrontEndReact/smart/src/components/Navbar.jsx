import { NavLink } from 'react-router-dom'

const Navbar = () => {
  const navItems = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/garage', label: 'Garage', icon: '🚗' },
    { path: '/led-panel', label: 'LED Control', icon: '💡' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <span className="text-2xl">◈</span>
            <span className="gradient-text font-semibold text-xl">Smart City</span>
          </div>
          
          <div className="flex gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-white/10 text-white border border-white/20'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                <span>{item.icon}</span>
                <span className="hidden sm:inline">{item.label}</span>
              </NavLink>
            ))}
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" />
            <span className="text-xs text-gray-400 hidden sm:inline">Live</span>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar