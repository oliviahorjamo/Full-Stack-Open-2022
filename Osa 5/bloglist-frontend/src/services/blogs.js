import axios from 'axios'
const baseUrl = '/api/blogs'

// aseta tokenille aluksi tyhjä arvo
let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

// aseta tokenin arvo oikeanlaiseksi stringiksi
const setToken = newToken => {
  token = `bearer ${newToken}`
}

const removeToken = () => {
  token = null
}

export default { getAll, setToken, removeToken }