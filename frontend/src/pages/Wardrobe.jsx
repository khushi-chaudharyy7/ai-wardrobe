import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { uploadClothing, getClothing, deleteClothing } from '../api'
import Navbar from '../components/Navbar'

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
    if (!user) { navigate('/login'); return }
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
    <div className="min-h-screen" style={{ backgroundColor: '#FAF7F2' }}>
      <Navbar showNav={true} />

      <div className="max-w-6xl mx-auto px-8 py-12">
        {/* Header */}
        <div className="flex justify-between items-end mb-12 border-b border-stone-200 pb-6">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-stone-400 mb-2">Your Collection</p>
            <h2 className="text-4xl font-bold text-stone-900" style={{ fontFamily: 'Playfair Display, serif' }}>
              My Wardrobe
            </h2>
          </div>
          <div className="flex gap-3 items-center">
            <p className="text-stone-400 text-sm">{clothes.length} pieces</p>
            <button
              onClick={() => setShowForm(true)}
              className="text-white px-6 py-3 text-xs tracking-widest uppercase font-medium hover:opacity-90 transition"
              style={{ backgroundColor: '#8B0000' }}
            >
              + Add Piece
            </button>
          </div>
        </div>

        {/* Upload Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center px-8 py-6 border-b border-stone-200">
                <h3 className="text-xl font-bold text-stone-900" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Add New Piece
                </h3>
                <button onClick={() => setShowForm(false)} className="text-stone-400 hover:text-stone-900 text-xl">✕</button>
              </div>

              <div className="px-8 py-6 flex flex-col gap-6">
                {/* Image Upload */}
                <div>
                  <label className="text-xs tracking-widest uppercase text-stone-500">Photo</label>
                  <label className="mt-2 w-full flex flex-col items-center justify-center border border-stone-200 py-8 cursor-pointer hover:border-stone-900 transition">
                    <p className="text-stone-400 text-sm">Click to upload photo</p>
                    <p className="text-stone-300 text-xs mt-1">PNG, JPG supported</p>
                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                  </label>
                  {preview && (
                    <img src={preview} alt="preview" className="mt-3 w-full h-48 object-cover" />
                  )}
                </div>

                {/* Category */}
                <div>
                  <label className="text-xs tracking-widest uppercase text-stone-500">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full mt-2 px-0 py-3 border-b border-stone-300 focus:outline-none focus:border-stone-900 bg-transparent text-stone-900"
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
                <div>
                  <label className="text-xs tracking-widest uppercase text-stone-500">Color</label>
                  <input
                    type="text"
                    placeholder="e.g. black, cream, burgundy"
                    value={form.color}
                    onChange={(e) => setForm({ ...form, color: e.target.value })}
                    className="w-full mt-2 px-0 py-3 border-b border-stone-300 focus:outline-none focus:border-stone-900 bg-transparent text-stone-900"
                  />
                </div>

                {/* Season */}
                <div>
                  <label className="text-xs tracking-widest uppercase text-stone-500">Season</label>
                  <select
                    value={form.season}
                    onChange={(e) => setForm({ ...form, season: e.target.value })}
                    className="w-full mt-2 px-0 py-3 border-b border-stone-300 focus:outline-none focus:border-stone-900 bg-transparent text-stone-900"
                  >
                    <option value="all">All Seasons</option>
                    <option value="summer">Summer</option>
                    <option value="winter">Winter</option>
                    <option value="spring">Spring</option>
                    <option value="autumn">Autumn</option>
                  </select>
                </div>

                {/* Occasion */}
                <div>
                  <label className="text-xs tracking-widest uppercase text-stone-500">Occasion</label>
                  <select
                    value={form.occasion}
                    onChange={(e) => setForm({ ...form, occasion: e.target.value })}
                    className="w-full mt-2 px-0 py-3 border-b border-stone-300 focus:outline-none focus:border-stone-900 bg-transparent text-stone-900"
                  >
                    <option value="any">Any</option>
                    <option value="casual">Casual</option>
                    <option value="formal">Formal</option>
                    <option value="party">Party</option>
                    <option value="sports">Sports</option>
                  </select>
                </div>

                {/* Brand */}
                <div>
                  <label className="text-xs tracking-widest uppercase text-stone-500">Brand (optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Zara, H&M"
                    value={form.brand}
                    onChange={(e) => setForm({ ...form, brand: e.target.value })}
                    className="w-full mt-2 px-0 py-3 border-b border-stone-300 focus:outline-none focus:border-stone-900 bg-transparent text-stone-900"
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full text-white py-4 text-xs tracking-widest uppercase font-medium hover:opacity-90 transition disabled:opacity-50"
                  style={{ backgroundColor: '#8B0000' }}
                >
                  {loading ? 'Uploading...' : 'Add to Wardrobe'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Clothes Grid */}
        {fetching ? (
          <div className="text-center text-stone-400 py-20 tracking-widest uppercase text-xs">
            Loading your collection...
          </div>
        ) : clothes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 border border-dashed border-stone-300">
            <p className="text-stone-400 text-sm tracking-widest uppercase mb-6">Your wardrobe is empty</p>
            <button
              onClick={() => setShowForm(true)}
              className="text-white px-8 py-3 text-xs tracking-widest uppercase font-medium hover:opacity-90 transition"
              style={{ backgroundColor: '#8B0000' }}
            >
              Add First Piece
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {clothes.map((item) => (
              <div key={item._id} className="group relative bg-white overflow-hidden">
                <img src={item.imageUrl} alt={item.category} className="w-full h-64 object-cover" />
                <div className="p-4">
                  <p className="font-medium text-stone-900 capitalize text-sm tracking-wide">{item.category}</p>
                  <p className="text-xs text-stone-400 capitalize mt-1">{item.color} — {item.occasion}</p>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="mt-3 text-xs text-stone-300 hover:text-red-800 tracking-widest uppercase transition"
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