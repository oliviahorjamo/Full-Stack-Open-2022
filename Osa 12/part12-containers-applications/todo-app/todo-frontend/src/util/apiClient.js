import axios from 'axios'
//require('dotenv').config()

console.log('frontendissa asetettu backendin url', process.env.REACT_APP_BACKEND_URL)

const apiClient = axios.create({
  //baseURL: process.env.REACT_APP_BACKEND_URL,
  baseURL: 'http://localhost:3001'
})

export default apiClient