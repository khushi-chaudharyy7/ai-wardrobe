const express = require('express')
const router = express.Router()
const multer = require('multer')
const { uploadClothing, getClothing, deleteClothing } = require('../controllers/clothingController')
const { protect } = require('../middleware/authMiddleware')

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
})

const upload = multer({ storage })

router.post('/', protect, upload.single('image'), uploadClothing)
router.get('/', protect, getClothing)
router.delete('/:id', protect, deleteClothing)

module.exports = router