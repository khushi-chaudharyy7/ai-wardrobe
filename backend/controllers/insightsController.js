const Clothing = require('../models/Clothing')

const getInsights = async (req, res) => {
  try {
    const userId = req.user.id
    const clothes = await Clothing.find({ user: userId })

    if (clothes.length === 0) {
      return res.status(400).json({ message: 'No clothes found!' })
    }

    // Category breakdown
    const categoryCount = {}
    clothes.forEach(item => {
      categoryCount[item.category] = (categoryCount[item.category] || 0) + 1
    })

    // Color breakdown
    const colorCount = {}
    clothes.forEach(item => {
      if (item.color) {
        colorCount[item.color] = (colorCount[item.color] || 0) + 1
      }
    })

    // Most used color
    const mostUsedColor = Object.entries(colorCount).sort((a, b) => b[1] - a[1])[0]

    // Wardrobe gaps
    const allCategories = ['tops', 'bottoms', 'shoes', 'accessories', 'dresses', 'jackets']
    const missingCategories = allCategories.filter(cat => !categoryCount[cat])

    // Season breakdown
    const seasonCount = {}
    clothes.forEach(item => {
      seasonCount[item.season] = (seasonCount[item.season] || 0) + 1
    })

    // Occasion breakdown
    const occasionCount = {}
    clothes.forEach(item => {
      occasionCount[item.occasion] = (occasionCount[item.occasion] || 0) + 1
    })

    // Insights messages
    const messages = []

    if (mostUsedColor) {
      messages.push(`Your wardrobe is dominated by ${mostUsedColor[0]} colored items.`)
    }

    if (missingCategories.length > 0) {
      messages.push(`You're missing: ${missingCategories.join(', ')} in your wardrobe.`)
    }

    const casualCount = occasionCount['casual'] || 0
    const formalCount = occasionCount['formal'] || 0
    if (casualCount > formalCount * 2) {
      messages.push('Your wardrobe is heavily casual — consider adding some formal pieces.')
    } else if (formalCount > casualCount) {
      messages.push('You have more formal wear than casual — time to add some casual pieces!')
    }

    if (clothes.length < 10) {
      messages.push('Your wardrobe is still growing — upload more items for better suggestions!')
    }

    res.status(200).json({
      totalItems: clothes.length,
      categoryCount,
      colorCount,
      seasonCount,
      occasionCount,
      missingCategories,
      messages
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong', error })
  }
}

module.exports = { getInsights }