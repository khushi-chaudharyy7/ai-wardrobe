import { useNavigate, useLocation } from 'react-router-dom'

function Navbar({ showNav = false }) {
  const navigate = useNavigate()
  const location = useLocation()
  const user = JSON.parse(localStorage.getItem('user'))

  const handleLogout = () => {
    localStorage.clear()
    navigate('/')
  }

  if (!showNav) {
    return (
      <nav className="bg-white px-8 py-5 flex justify-between items-center border-b border-stone-200">
        <h1
          className="text-2xl font-bold cursor-pointer tracking-widest uppercase"
          style={{ fontFamily: 'Playfair Display, serif', color: '#8B0000' }}
          onClick={() => navigate('/')}
        >
          Atelier
        </h1>
        <div className="flex gap-4 items-center">
          <button
            onClick={() => navigate('/login')}
            className="text-stone-600 hover:text-stone-900 font-medium text-sm tracking-wide"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/signup')}
            className="text-white px-5 py-2 text-sm tracking-wide font-medium"
            style={{ backgroundColor: '#8B0000' }}
          >
            Get Started
          </button>
        </div>
      </nav>
    )
  }

  const navItems = [
    { label: 'Wardrobe', path: '/wardrobe' },
    { label: 'Outfit', path: '/outfit' },
    { label: 'Insights', path: '/insights' },
  ]

  return (
    <nav className="bg-white px-8 py-5 flex justify-between items-center border-b border-stone-200">
      <h1
        className="text-2xl font-bold cursor-pointer tracking-widest uppercase"
        style={{ fontFamily: 'Playfair Display, serif', color: '#8B0000' }}
        onClick={() => navigate('/wardrobe')}
      >
        Atelier
      </h1>

      <div className="flex items-center gap-8">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`text-sm tracking-widest uppercase font-medium transition ${
              location.pathname === item.path
                ? 'text-stone-900 border-b-2 border-stone-900'
                : 'text-stone-400 hover:text-stone-900'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <span className="text-stone-500 text-sm">Hi, {user?.name}</span>
        <button
          onClick={handleLogout}
          className="text-sm tracking-wide text-stone-400 hover:text-red-800"
        >
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Navbar