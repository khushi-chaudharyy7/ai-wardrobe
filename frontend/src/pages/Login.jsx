import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { loginUser } from '../api'

function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await loginUser(form)
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      navigate('/wardrobe')
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-10 rounded-2xl shadow-sm w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome back</h2>
        <p className="text-gray-500 mb-8">Login to your wardrobe</p>

        {error && (
          <div className="bg-red-50 text-red-500 px-4 py-3 rounded-xl mb-4 text-sm">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full mt-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full mt-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700 font-medium mt-2 disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <p className="text-center text-gray-500 text-sm">
            Don't have an account?{" "}
            <span
              onClick={() => navigate('/signup')}
              className="text-purple-600 font-medium cursor-pointer hover:underline"
            >
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login