import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Wardrobe from './pages/Wardrobe'
import Outfit from './pages/Outfit'
import Insights from './pages/Insights'

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/wardrobe" element={<Wardrobe />} />
        <Route path="/outfit" element={<Outfit />} />
        <Route path="/insights" element={<Insights />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App