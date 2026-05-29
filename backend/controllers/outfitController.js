const Clothing = require('../models/Clothing')

const getOutfitSuggestion = async (req, res) => {
  try {
    const { occasion, season } = req.query
    const userId = req.user.id

    // Get all clothes of this user
    const allClothes = await Clothing.find({ user: userId })

    if (allClothes.length < 2) {
      return res.status(400).json({ 
        message: 'Upload at least 2-3 clothing items to get outfit suggestions!' 
      })
    }

    // Filter by occasion and season
    const filter = (category) => {
      return allClothes.filter(item => {
        const matchCategory = item.category === category
        const matchOccasion = item.occasion === occasion || item.occasion === 'any'
        const matchSeason = item.season === season || item.season === 'all'
        return matchCategory && matchOccasion && matchSeason
      })
    }

    // Pick random item from array
    const pick = (arr) => arr.length > 0 ? arr[Math.floor(Math.random() * arr.length)] : null

    // Build outfit
    const top = pick(filter('tops')) || pick(allClothes.filter(i => i.category === 'tops'))
    const bottom = pick(filter('bottoms')) || pick(allClothes.filter(i => i.category === 'bottoms'))
    const shoes = pick(filter('shoes')) || pick(allClothes.filter(i => i.category === 'shoes'))
    const jacket = pick(filter('jackets')) || null
    const accessory = pick(filter('accessories')) || null
    const dress = pick(filter('dresses')) || null

    // Build outfit object — dress replaces top+bottom
    const outfit = {}
    if (dress) {
      outfit.dress = dress
    } else {
      if (top) outfit.top = top
      if (bottom) outfit.bottom = bottom
    }
    if (shoes) outfit.shoes = shoes
    if (jacket) outfit.jacket = jacket
    if (accessory) outfit.accessory = accessory

    if (Object.keys(outfit).length === 0) {
      return res.status(400).json({ 
        message: 'Not enough items to build an outfit. Upload more clothes!' 
      })
    }

    res.status(200).json({ outfit })

  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong', error })
  }
}

module.exports = { getOutfitSuggestion }