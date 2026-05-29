const mongoose = require('mongoose')

const clothingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['tops', 'bottoms', 'shoes', 'accessories', 'dresses', 'jackets'],
    required: true
  },
  color: {
    type: String,
    default: ''
  },
  season: {
    type: String,
    enum: ['summer', 'winter', 'spring', 'autumn', 'all'],
    default: 'all'
  },
  occasion: {
    type: String,
    enum: ['casual', 'formal', 'party', 'sports', 'any'],
    default: 'any'
  },
  brand: {
    type: String,
    default: ''
  },
  notes: {
    type: String,
    default: ''
  }
}, { timestamps: true })

module.exports = mongoose.model('Clothing', clothingSchema)