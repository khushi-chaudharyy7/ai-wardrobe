import { useNavigate } from 'react-router-dom'

function Hero() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center text-center px-4 py-24">
      <h1 className="text-6xl font-bold text-gray-800 mb-6">
        Your AI Personal <span className="text-purple-600">Stylist</span>
      </h1>
      <p className="text-xl text-gray-500 mb-10 max-w-xl">
        Upload your clothes, get outfit suggestions, and discover your style — all powered by AI.
      </p>
      <button 
        onClick={() => navigate('/signup')}
        className="bg-purple-600 text-white px-8 py-4 rounded-full text-lg hover:bg-purple-700 font-medium">
        Build My Wardrobe →
      </button>
    </div>
  )
}

export default Hero