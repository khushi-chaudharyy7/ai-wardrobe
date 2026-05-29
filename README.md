# Atelier — AI-Powered Digital Wardrobe & Styling Platform

A full-stack fashion platform that helps users organize their wardrobe, generate personalized outfit recommendations, and gain insights into their style habits.

## Live Demo

[View Live](https://ai-wardrobe-gilt.vercel.app)

---

## Features

- Digital Wardrobe — Upload and organize clothing items with cloud image storage
- Outfit Curation — AI-generated outfit recommendations based on occasion and season
- Style Insights — Analyze color usage, category breakdown, and wardrobe gaps
- Authentication — Secure signup and login with JWT tokens
- Responsive UI — Clean, minimal interface built with React and Tailwind CSS

---

## Tech Stack

**Frontend**
- React.js + Vite
- Tailwind CSS
- React Router DOM
- Axios

**Backend**
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- Bcrypt

**Cloud**
- Cloudinary — image storage
- MongoDB Atlas — database hosting
- Render — backend deployment
- Vercel — frontend deployment

---

## Project Structure
atelier/
├── frontend/
│   └── src/
│       ├── components/
│       ├── pages/
│       └── api.js
└── backend/
├── controllers/
├── models/
├── routes/
└── middleware/

---

## Getting Started

**Prerequisites**
- Node.js
- MongoDB Atlas account
- Cloudinary account

**Clone the repository**
```bash
git clone https://github.com/khushi-chaudharyy7/ai-wardrobe.git
cd ai-wardrobe
```

**Backend setup**
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
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

**Frontend setup**
```bash
cd frontend
npm install
npm run dev
```

---

## Author

Khushi Chaudhary