const features = [
    {
      icon: "👗",
      title: "Digital Wardrobe",
      description: "Upload all your clothes and organize them in one place. Never forget what you own again."
    },
    {
      icon: "✨",
      title: "AI Outfit Suggestions",
      description: "Get personalized outfit recommendations based on occasion, weather, and your style."
    },
    {
      icon: "📊",
      title: "Wardrobe Insights",
      description: "Discover which clothes you overuse, what's missing, and how to shop smarter."
    }
  ]
  
  function Features() {
    return (
      <div className="px-8 py-16 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Everything you need to dress better
        </h2>
        <div className="grid grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }
  
  export default Features