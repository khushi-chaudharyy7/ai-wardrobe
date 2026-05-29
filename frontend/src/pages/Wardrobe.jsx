import Navbar from '../components/Navbar'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { uploadClothing, getClothing, deleteClothing } from '../api'

function Wardrobe() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))
  const [clothes, setClothes] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [form, setForm] = useState({
    category: 'tops',
    color: '',
    season: 'all',
    occasion: 'any',
    brand: '',
    notes: ''
  })
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }
    fetchClothes()
  }, [])

  const fetchClothes = async () => {
    try {
      const res = await getClothing()
      setClothes(res.data.clothes)
    } catch (error) {
      console.log(error)
    }
    setFetching(false)
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    setImage(file)
    setPreview(URL.createObjectURL(file))
  }

  const handleSubmit = async () => {
    if (!image) return alert('Please select an image')
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('image', image)
      formData.append('category', form.category)
      formData.append('color', form.color)
      formData.append('season', form.season)
      formData.append('occasion', form.occasion)
      formData.append('brand', form.brand)
      formData.append('notes', form.notes)

      await uploadClothing(formData)
      setShowForm(false)
      setImage(null)
      setPreview(null)
      setForm({ category: 'tops', color: '', season: 'all', occasion: 'any', brand: '', notes: '' })
      fetchClothes()
    } catch (error) {
      console.log(error)
      alert('Upload failed, try again')
    }
    setLoading(false)
  }

  const handleDelete = async (id) => {
    try {
      await deleteClothing(id)
      setClothes(clothes.filter(c => c._id !== id))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar showNav={true} />

      <div className="max-w-6xl mx-auto px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
            <h2 className="text-3xl font-bold text-gray-800">My Wardrobe</h2>
            <p className="text-gray-500">{clothes.length} items</p>
        </div>
        <div className="flex gap-3">
            <button
              onClick={() => navigate('/insights')}
              className="border-2 border-pink-500 text-pink-500 px-6 py-3 rounded-xl hover:bg-pink-50 font-medium"
            >
              📊 Insights
            </button>
            <button
              onClick={() => navigate('/outfit')}
              className="border-2 border-purple-600 text-purple-600 px-6 py-3 rounded-xl hover:bg-purple-50 font-medium"
            >
              ✨ Get Outfit
            </button>
            <button
              onClick={() => setShowForm(true)}
              className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 font-medium"
            >
              + Upload Clothing
            </button>
        </div>
      </div>

        {/* Upload Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Upload Clothing</h3>
                <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600 text-2xl">✕</button>
              </div>

              {/* Image Upload */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Photo</label>
                <label className="w-full flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl py-8 cursor-pointer hover:border-purple-400 hover:bg-purple-50 transition">
                  <div className="text-4xl mb-2">📸</div>
                  <p className="text-gray-500 font-medium">Click to upload photo</p>
                  <p className="text-gray-400 text-sm mt-1">PNG, JPG supported</p>
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>
                {preview && (
                  <img src={preview} alt="preview" className="mt-3 w-full h-48 object-cover rounded-xl" />
                )}
                
              </div>

              {/* Category */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                >
                  <option value="tops">Tops</option>
                  <option value="bottoms">Bottoms</option>
                  <option value="shoes">Shoes</option>
                  <option value="accessories">Accessories</option>
                  <option value="dresses">Dresses</option>
                  <option value="jackets">Jackets</option>
                </select>
              </div>

              {/* Color */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                <input
                  type="text"
                  placeholder="e.g. blue, red, black"
                  value={form.color}
                  onChange={(e) => setForm({ ...form, color: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>

              {/* Season */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Season</label>
                <select
                  value={form.season}
                  onChange={(e) => setForm({ ...form, season: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                >
                  <option value="all">All Seasons</option>
                  <option value="summer">Summer</option>
                  <option value="winter">Winter</option>
                  <option value="spring">Spring</option>
                  <option value="autumn">Autumn</option>
                </select>
              </div>

              {/* Occasion */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Occasion</label>
                <select
                  value={form.occasion}
                  onChange={(e) => setForm({ ...form, occasion: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                >
                  <option value="any">Any</option>
                  <option value="casual">Casual</option>
                  <option value="formal">Formal</option>
                  <option value="party">Party</option>
                  <option value="sports">Sports</option>
                </select>
              </div>

              {/* Brand */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Brand (optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Zara, H&M"
                  value={form.brand}
                  onChange={(e) => setForm({ ...form, brand: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700 font-medium disabled:opacity-50"
              >
                {loading ? 'Uploading...' : 'Upload'}
              </button>
            </div>
          </div>
        )}

        {/* Clothes Grid */}
        {fetching ? (
          <div className="text-center text-gray-400 py-20">Loading your wardrobe...</div>
        ) : clothes.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 shadow-sm flex flex-col items-center justify-center border-2 border-dashed border-gray-200">
            <div className="text-6xl mb-4">👗</div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">Your wardrobe is empty</h3>
            <p className="text-gray-400 mb-6">Start by uploading your first clothing item</p>
            <button
              onClick={() => setShowForm(true)}
              className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 font-medium"
            >
              + Upload Clothing
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {clothes.map((item) => (
              <div key={item._id} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition">
              <img src={item.imageUrl} alt={item.category} className="w-full h-48 object-cover" />
              <div className="p-4">
                <p className="font-semibold text-gray-800 capitalize">{item.category}</p>
                <p className="text-sm text-gray-400 capitalize">{item.color} • {item.occasion}</p>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="mt-3 text-red-400 hover:text-red-600 text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
)
}

export default Wardrobe