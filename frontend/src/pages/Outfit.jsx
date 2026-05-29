import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getOutfitSuggestion } from '../api'
import Navbar from '../components/Navbar'

function Outfit() {
  const navigate = useNavigate()
  const [occasion, setOccasion] = useState('casual')
  const [season, setSeason] = useState('all')
  const [outfit, setOutfit] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSuggest = async () => {
    setLoading(true)
    setError('')
    setOutfit(null)
    try {
      const res = await getOutfitSuggestion(occasion, season)
      setOutfit(res.data.outfit)
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAF7F2' }}>
      <Navbar showNav={true} />

      <div className="max-w-4xl mx-auto px-8 py-12">
        {/* Header */}
        <div className="border-b border-stone-200 pb-6 mb-12">
          <p className="text-xs tracking-[0.3em] uppercase text-stone-400 mb-2">AI Styling</p>
          <h2 className="text-4xl font-bold text-stone-900" style={{ fontFamily: 'Playfair Display, serif' }}>
            Outfit Curation
          </h2>
        </div>

        {/* Filters */}
        <div className="bg-white p-8 mb-10">
          <p className="text-xs tracking-[0.3em] uppercase text-stone-400 mb-8">Tell us the occasion</p>
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <label className="text-xs tracking-widest uppercase text-stone-500">Occasion</label>
              <select
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
                className="w-full mt-2 px-0 py-3 border-b border-stone-300 focus:outline-none focus:border-stone-900 bg-transparent text-stone-900"
              >
                <option value="casual">Casual</option>
                <option value="formal">Formal</option>
                <option value="party">Party</option>
                <option value="sports">Sports</option>
                <option value="any">Any</option>
              </select>
            </div>

            <div>
              <label className="text-xs tracking-widest uppercase text-stone-500">Season</label>
              <select
                value={season}
                onChange={(e) => setSeason(e.target.value)}
                className="w-full mt-2 px-0 py-3 border-b border-stone-300 focus:outline-none focus:border-stone-900 bg-transparent text-stone-900"
              >
                <option value="all">All Seasons</option>
                <option value="summer">Summer</option>
                <option value="winter">Winter</option>
                <option value="spring">Spring</option>
                <option value="autumn">Autumn</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleSuggest}
            disabled={loading}
            className="w-full text-white py-4 text-xs tracking-widest uppercase font-medium hover:opacity-90 transition disabled:opacity-50"
            style={{ backgroundColor: '#8B0000' }}
          >
            {loading ? 'Curating your outfit...' : 'Curate Outfit'}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="border-l-4 border-red-800 bg-red-50 text-red-800 px-4 py-3 mb-6 text-sm">
            {error}
          </div>
        )}

        {/* Outfit Result */}
        {outfit && (
          <div className="bg-white p-8">
            <p className="text-xs tracking-[0.3em] uppercase text-stone-400 mb-8">Your Curated Look</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
              {Object.entries(outfit).map(([type, item]) => (
                <div key={type} className="flex flex-col">
                  <img
                    src={item.imageUrl}
                    alt={type}
                    className="w-full h-56 object-cover"
                  />
                  <div className="pt-3">
                    <p className="text-xs tracking-widest uppercase text-stone-900 font-medium">{type}</p>
                    <p className="text-xs text-stone-400 mt-1 capitalize">{item.color} — {item.occasion}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleSuggest}
              className="w-full border border-stone-900 text-stone-900 py-4 text-xs tracking-widest uppercase font-medium hover:bg-stone-900 hover:text-white transition"
            >
              Try Another Look
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Outfit