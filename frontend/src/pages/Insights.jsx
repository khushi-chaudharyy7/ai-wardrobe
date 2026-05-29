import Navbar from '../components/Navbar'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getInsights } from '../api'

function Insights() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))
  const [insights, setInsights] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchInsights()
  }, [])

  const fetchInsights = async () => {
    try {
      const res = await getInsights()
      setInsights(res.data)
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
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Wardrobe Insights</h2>
        <p className="text-gray-500 mb-8">Understand your style and wardrobe habits</p>

        {loading && (
          <div className="text-center text-gray-400 py-20">Analyzing your wardrobe...</div>
        )}

        {error && (
          <div className="bg-red-50 text-red-500 px-4 py-3 rounded-xl mb-6 text-sm">
            {error}
          </div>
        )}

        {insights && (
          <div className="flex flex-col gap-6">

            {/* Total Items */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-700 mb-1">Total Items</h3>
              <p className="text-5xl font-bold text-purple-600">{insights.totalItems}</p>
              <p className="text-gray-400 mt-1">items in your wardrobe</p>
            </div>

            {/* AI Insights Messages */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-700 mb-4">✨ Style Insights</h3>
              {insights.messages.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {insights.messages.map((msg, i) => (
                    <div key={i} className="bg-purple-50 text-purple-700 px-4 py-3 rounded-xl text-sm">
                      {msg}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400">Upload more items for insights!</p>
              )}
            </div>

            {/* Category Breakdown */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-700 mb-4">Category Breakdown</h3>
              <div className="flex flex-col gap-3">
                {Object.entries(insights.categoryCount).map(([category, count]) => (
                  <div key={category}>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-600 capitalize">{category}</span>
                      <span className="text-gray-400 text-sm">{count} items</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className="bg-purple-500 h-2 rounded-full"
                        style={{ width: `${(count / insights.totalItems) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Color Breakdown */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-700 mb-4">Colors in Your Wardrobe</h3>
              <div className="flex flex-wrap gap-3">
                {Object.entries(insights.colorCount).map(([color, count]) => (
                  <div key={color} className="bg-gray-100 px-4 py-2 rounded-full text-sm text-gray-700">
                    {color} <span className="text-purple-600 font-bold">×{count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Missing Categories */}
            {insights.missingCategories.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-700 mb-4">⚠️ Wardrobe Gaps</h3>
                <div className="flex flex-wrap gap-3">
                  {insights.missingCategories.map((cat) => (
                    <div key={cat} className="bg-red-50 text-red-500 px-4 py-2 rounded-full text-sm capitalize">
                      Missing: {cat}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Occasion Breakdown */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-700 mb-4">Occasion Breakdown</h3>
              <div className="flex flex-col gap-3">
                {Object.entries(insights.occasionCount).map(([occasion, count]) => (
                  <div key={occasion}>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-600 capitalize">{occasion}</span>
                      <span className="text-gray-400 text-sm">{count} items</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className="bg-pink-400 h-2 rounded-full"
                        style={{ width: `${(count / insights.totalItems) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  )
}

export default Insights