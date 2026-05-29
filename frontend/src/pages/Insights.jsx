import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getInsights } from '../api'
import Navbar from '../components/Navbar'

function Insights() {
  const navigate = useNavigate()
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
    <div className="min-h-screen" style={{ backgroundColor: '#FAF7F2' }}>
      <Navbar showNav={true} />

      <div className="max-w-4xl mx-auto px-8 py-12">
        {/* Header */}
        <div className="border-b border-stone-200 pb-6 mb-12">
          <p className="text-xs tracking-[0.3em] uppercase text-stone-400 mb-2">Analytics</p>
          <h2 className="text-4xl font-bold text-stone-900" style={{ fontFamily: 'Playfair Display, serif' }}>
            Style Insights
          </h2>
        </div>

        {loading && (
          <div className="text-center text-stone-400 py-20 tracking-widest uppercase text-xs">
            Analyzing your wardrobe...
          </div>
        )}

        {error && (
          <div className="border-l-4 border-red-800 bg-red-50 text-red-800 px-4 py-3 mb-6 text-sm">
            {error}
          </div>
        )}

        {insights && (
          <div className="flex flex-col gap-8">

            {/* Total Items */}
            <div className="bg-white p-8 flex justify-between items-center">
              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-stone-400 mb-2">Total Pieces</p>
                <p className="text-6xl font-bold text-stone-900" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {insights.totalItems}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs tracking-widest uppercase text-stone-400">in your collection</p>
              </div>
            </div>

            {/* Style Insights Messages */}
            <div className="bg-white p-8">
              <p className="text-xs tracking-[0.3em] uppercase text-stone-400 mb-6">Style Analysis</p>
              {insights.messages.length > 0 ? (
                <div className="flex flex-col gap-4">
                  {insights.messages.map((msg, i) => (
                    <div key={i} className="flex gap-4 items-start border-l-2 pl-4" style={{ borderColor: '#8B0000' }}>
                      <p className="text-stone-600 text-sm leading-relaxed">{msg}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-stone-400 text-sm">Upload more items for insights!</p>
              )}
            </div>

            {/* Category Breakdown */}
            <div className="bg-white p-8">
              <p className="text-xs tracking-[0.3em] uppercase text-stone-400 mb-6">Category Breakdown</p>
              <div className="flex flex-col gap-5">
                {Object.entries(insights.categoryCount).map(([category, count]) => (
                  <div key={category}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-stone-700 capitalize tracking-wide">{category}</span>
                      <span className="text-xs text-stone-400">{count} pieces</span>
                    </div>
                    <div className="w-full bg-stone-100 h-1">
                      <div
                        className="h-1 transition-all"
                        style={{
                          width: `${(count / insights.totalItems) * 100}%`,
                          backgroundColor: '#8B0000'
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Color Breakdown */}
            <div className="bg-white p-8">
              <p className="text-xs tracking-[0.3em] uppercase text-stone-400 mb-6">Color Palette</p>
              <div className="flex flex-wrap gap-3">
                {Object.entries(insights.colorCount).map(([color, count]) => (
                  <div key={color} className="border border-stone-200 px-4 py-2 text-sm text-stone-700">
                    {color} <span className="text-stone-400">×{count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Wardrobe Gaps */}
            {insights.missingCategories.length > 0 && (
              <div className="bg-white p-8">
                <p className="text-xs tracking-[0.3em] uppercase text-stone-400 mb-6">Wardrobe Gaps</p>
                <div className="flex flex-wrap gap-3">
                  {insights.missingCategories.map((cat) => (
                    <div key={cat} className="border border-red-200 px-4 py-2 text-sm text-red-800 capitalize">
                      Missing: {cat}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Occasion Breakdown */}
            <div className="bg-white p-8">
              <p className="text-xs tracking-[0.3em] uppercase text-stone-400 mb-6">Occasion Breakdown</p>
              <div className="flex flex-col gap-5">
                {Object.entries(insights.occasionCount).map(([occasion, count]) => (
                  <div key={occasion}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-stone-700 capitalize tracking-wide">{occasion}</span>
                      <span className="text-xs text-stone-400">{count} pieces</span>
                    </div>
                    <div className="w-full bg-stone-100 h-1">
                      <div
                        className="h-1 transition-all"
                        style={{
                          width: `${(count / insights.totalItems) * 100}%`,
                          backgroundColor: '#3D1C02'
                        }}
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