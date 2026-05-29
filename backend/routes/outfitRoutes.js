const express = require('express')
const router = express.Router()
const { getOutfitSuggestion } = require('../controllers/outfitController')
const { protect } = require('../middleware/authMiddleware')

router.get('/suggest', protect, getOutfitSuggestion)

module.exports = router