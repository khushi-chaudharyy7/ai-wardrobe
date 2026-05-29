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
    <div className="min-h-screen flex" style={{ backgroundColor: '#FAF7F2' }}>
      {/* Left Side */}
      <div className="hidden md:flex w-1/2 flex-col justify-center px-16" style={{ backgroundColor: '#1A1A1A' }}>
        <h1 className="text-5xl font-bold text-white mb-4 leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
          Welcome <br />back.
        </h1>
        <p className="text-stone-400 text-sm leading-relaxed max-w-xs">
          Your wardrobe has been waiting. Step back into your personal styling studio.
        </p>
      </div>

      {/* Right Side */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-stone-900 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
            Sign in
          </h2>
          <p className="text-stone-400 text-sm mb-10">Enter your credentials to continue</p>

          {error && (
            <div className="bg-red-50 text-red-800 px-4 py-3 mb-6 text-sm border-l-4 border-red-800">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-5">
            <div>
              <label className="text-xs tracking-widest uppercase text-stone-500">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full mt-2 px-0 py-3 border-b border-stone-300 focus:outline-none focus:border-stone-900 bg-transparent text-stone-900"
              />
            </div>

            <div>
              <label className="text-xs tracking-widest uppercase text-stone-500">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full mt-2 px-0 py-3 border-b border-stone-300 focus:outline-none focus:border-stone-900 bg-transparent text-stone-900"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full text-white py-4 text-sm tracking-widest uppercase font-medium mt-4 hover:opacity-90 transition disabled:opacity-50"
              style={{ backgroundColor: '#8B0000' }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>

            <p className="text-center text-stone-400 text-sm">
              Don't have an account?{" "}
              <span
                onClick={() => navigate('/signup')}
                className="text-stone-900 font-medium cursor-pointer hover:underline"
              >
                Create one
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login