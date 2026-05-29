const Clothing = require('../models/Clothing')
const cloudinary = require('../config/cloudinary')

// Upload clothing item
const uploadClothing = async (req, res) => {
  try {
    console.log('Upload request received')
    console.log('File:', req.file)
    console.log('Body:', req.body)

    if (!req.file) {
      return res.status(400).json({ message: 'No image uploaded' })
    }
    const { category, color, season, occasion, brand, notes } = req.body

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'wardrobe-ai',
      use_filename: true
    })

    console.log('Cloudinary result:', result.secure_url)

    // Save to MongoDB
    const clothing = await Clothing.create({
      user: req.user.id,
      imageUrl: result.secure_url,
      category,
      color,
      season,
      occasion,
      brand,
      notes
    })

    res.status(201).json({
      message: 'Clothing uploaded successfully',
      clothing
    })

  } catch (error) {
    console.log('Upload error:', error)
    res.status(500).json({ message: 'Something went wrong', error })
  }
}

// Get all clothing items for a user
const getClothing = async (req, res) => {
  try {
    const clothes = await Clothing.find({ user: req.user.id }).sort({ createdAt: -1 })
    res.status(200).json({ clothes })
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error })
  }
}

// Delete clothing item
const deleteClothing = async (req, res) => {
  try {
    const clothing = await Clothing.findById(req.params.id)

    if (!clothing) {
      return res.status(404).json({ message: 'Item not found' })
    }

    // Make sure user owns this item
    if (clothing.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' })
    }

    await clothing.deleteOne()
    res.status(200).json({ message: 'Item deleted successfully' })

  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error })
  }
}

module.exports = { uploadClothing, getClothing, deleteClothing }