import { useNavigate, useLocation } from 'react-router-dom'

function Navbar({ showNav = false }) {
  const navigate = useNavigate()
  const location = useLocation()
  const user = JSON.parse(localStorage.getItem('user'))

  const handleLogout = () => {
    localStorage.clear()
    navigate('/')
  }

  // Public navbar (landing page)
  if (!showNav) {
    return (
      <nav className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
        <h1
          className="text-2xl font-bold text-purple-600 cursor-pointer"
          onClick={() => navigate('/')}
        >
          👗 Wardrobe.ai
        </h1>
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/login')}
            className="text-gray-600 hover:text-purple-600 font-medium"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/signup')}
            className="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 font-medium"
          >
            Get Started
          </button>
        </div>
      </nav>
    )
  }

  // App navbar (after login)
  const navItems = [
    { label: '👗 Wardrobe', path: '/wardrobe' },
    { label: '✨ Outfit', path: '/outfit' },
    { label: '📊 Insights', path: '/insights' },
  ]

  return (
    <nav className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
      <h1
        className="text-2xl font-bold text-purple-600 cursor-pointer"
        onClick={() => navigate('/wardrobe')}
      >
        👗 Wardrobe.ai
      </h1>

      <div className="flex items-center gap-6">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`font-medium transition ${
              location.pathname === item.path
                ? 'text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-500 hover:text-purple-600'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <span className="text-gray-600">Hi, {user?.name}! 👋</span>
        <button
          onClick={handleLogout}
          className="text-red-400 hover:text-red-600 font-medium"
        >
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Navbar