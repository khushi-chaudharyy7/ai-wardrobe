const features = [
  {
    title: "Digital Wardrobe",
    description: "Upload and organize every piece you own. Your entire closet, beautifully catalogued in one place."
  },
  {
    title: "AI Outfit Curation",
    description: "Get personalized outfit recommendations based on occasion, season, and your unique style."
  },
  {
    title: "Style Insights",
    description: "Discover patterns in your wardrobe. Understand what you wear, what you don't, and what's missing."
  }
]

function Features() {
  return (
    <div className="px-8 py-24 max-w-6xl mx-auto">
      <p className="text-xs tracking-[0.3em] uppercase text-stone-400 text-center mb-4">What We Offer</p>
      <h2 className="text-4xl font-bold text-center text-stone-900 mb-16" style={{ fontFamily: 'Playfair Display, serif' }}>
        Everything your wardrobe needs.
      </h2>
      <div className="grid grid-cols-3 gap-12">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col border-t-2 border-stone-900 pt-6">
            <p className="text-xs tracking-[0.2em] uppercase text-stone-400 mb-3">0{index + 1}</p>
            <h3 className="text-xl font-bold text-stone-900 mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>{feature.title}</h3>
            <p className="text-stone-500 leading-relaxed text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Features