import { useNavigate } from 'react-router-dom'

function Hero() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center text-center px-4 py-32" style={{ backgroundColor: '#FAF7F2' }}>
      <p className="text-xs tracking-[0.3em] uppercase text-stone-400 mb-6">Your Personal Styling Studio</p>
      <h1 className="text-7xl font-bold text-stone-900 mb-6 leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
        Dress with <span style={{ color: '#8B0000' }}>intention.</span>
      </h1>
      <p className="text-lg text-stone-500 mb-12 max-w-lg leading-relaxed">
        Upload your wardrobe, discover your style, and let AI curate outfits made for you.
      </p>
      <button
        onClick={() => navigate('/signup')}
        className="text-white px-10 py-4 text-sm tracking-widest uppercase font-medium hover:opacity-90 transition"
        style={{ backgroundColor: '#8B0000' }}
      >
        Build My Wardrobe
      </button>
    </div>
  )
}

export default Hero