const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const authRoutes = require('./routes/authRoutes')
const clothingRoutes = require('./routes/clothingRoutes')
const outfitRoutes = require('./routes/outfitRoutes')
const insightsRoutes = require('./routes/insightsRoutes')

dotenv.config()

const app = express()

// Middleware
app.use(cors({
  origin: '*'
}))
app.use(express.json())
const path = require('path')
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/clothing', clothingRoutes)
app.use('/api/outfit', outfitRoutes)
app.use('/api/insights', insightsRoutes)

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Wardrobe.ai backend is running!' })
})

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected!')
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`)
    })
  })
  .catch((err) => console.log(err))