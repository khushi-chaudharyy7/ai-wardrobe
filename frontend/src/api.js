import axios from 'axios'

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api'
})

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const signupUser = (data) => API.post('/auth/signup', data)
export const loginUser = (data) => API.post('/auth/login', data)
export const uploadClothing = (data) => API.post('/clothing', data)
export const getClothing = () => API.get('/clothing')
export const deleteClothing = (id) => API.delete(`/clothing/${id}`)
export const getOutfitSuggestion = (occasion, season) => API.get(`/outfit/suggest?occasion=${occasion}&season=${season}`)
export const getInsights = () => API.get('/insights')