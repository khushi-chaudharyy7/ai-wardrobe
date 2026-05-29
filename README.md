# 👗 Wardrobe.ai — AI-Powered Digital Wardrobe & Styling Platform

A full-stack AI-powered fashion platform that helps users organize their wardrobe, generate personalized outfit recommendations, and gain insights into their style habits.

## 🚀 Live Demo
[View Live →](https://ai-wardrobe-gilt.vercel.app)

## ✨ Features

- **Digital Wardrobe** — Upload and organize clothing items with image storage
- **AI Outfit Suggestions** — Get personalized outfit recommendations based on occasion and season
- **Wardrobe Insights** — Analyze your style patterns, color usage, and wardrobe gaps
- **Authentication** — Secure signup/login with JWT tokens
- **Responsive UI** — Clean, modern interface built with React and Tailwind CSS

## 🛠️ Tech Stack

**Frontend**
- React.js + Vite
- Tailwind CSS
- React Router DOM
- Axios

**Backend**
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- Bcrypt password hashing

**Cloud Services**
- Cloudinary (image storage)
- MongoDB Atlas (database)

## 📁 Project Structure
ai-wardrobe/
├── frontend/          # React application
│   ├── src/
│   │   ├── components/    # Navbar, Hero, Features
│   │   ├── pages/         # Wardrobe, Outfit, Insights, Login, Signup
│   │   └── api.js         # API configuration
└── backend/           # Node.js server
├── controllers/   # Auth, Clothing, Outfit, Insights logic
├── models/        # User, Clothing schemas
├── routes/        # API routes
└── middleware/    # JWT authentication

## 🏃 Getting Started

### Prerequisites
- Node.js
- MongoDB Atlas account
- Cloudinary account

### Installation

1. Clone the repository
```bash
git clone https://github.com/khushi-chaudharyy7/ai-wardrobe.git
cd ai-wardrobe
```

2. Setup Backend
```bash
cd backend
npm install
```

Create `.env` file in backend:
MONGO_URI=your_mongodb_uri
PORT=8000
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_UPLOAD_PRESET=your_upload_preset

```bash
npm run dev
```

3. Setup Frontend
```bash
cd frontend
npm install
npm run dev
```

## 👩‍💻 Author
Khushi Chaudhary