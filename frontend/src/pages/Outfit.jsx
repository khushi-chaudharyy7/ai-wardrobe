import Navbar from '../components/Navbar'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getOutfitSuggestion } from '../api'

function Outfit() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))
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
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar showNav={true} />

      <div className="max-w-4xl mx-auto px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Outfit Suggester</h2>
        <p className="text-gray-500 mb-8">Tell us the occasion and we'll build your outfit!</p>

        {/* Filters */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Occasion</label>
              <select
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                <option value="casual">Casual</option>
                <option value="formal">Formal</option>
                <option value="party">Party</option>
                <option value="sports">Sports</option>
                <option value="any">Any</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Season</label>
              <select
                value={season}
                onChange={(e) => setSeason(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
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
            className="mt-6 w-full bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700 font-medium disabled:opacity-50"
          >
            {loading ? 'Building your outfit...' : '✨ Suggest Outfit'}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 text-red-500 px-4 py-3 rounded-xl mb-6 text-sm">
            {error}
          </div>
        )}

        {/* Outfit Result */}
        {outfit && (
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Your Outfit ✨</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {Object.entries(outfit).map(([type, item]) => (
                <div key={type} className="flex flex-col items-center">
                  <img
                    src={item.imageUrl}
                    alt={type}
                    className="w-full h-48 object-cover rounded-2xl shadow-sm"
                  />
                  <p className="mt-2 font-medium text-gray-700 capitalize">{type}</p>
                  <p className="text-sm text-gray-400 capitalize">{item.color} • {item.occasion}</p>
                </div>
              ))}
            </div>

            <button
              onClick={handleSuggest}
              className="mt-8 w-full border-2 border-purple-600 text-purple-600 py-3 rounded-xl hover:bg-purple-50 font-medium"
            >
              🔄 Try Another Outfit
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Outfit