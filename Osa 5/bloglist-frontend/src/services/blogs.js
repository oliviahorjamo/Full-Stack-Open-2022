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

const create = async newBlog => {
  console.log('luomassa uutta blogia')
  console.log(newBlog)
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async (newBlog, blogId) => {
  console.log('päivitetään blogia', blogId)
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.put(`${baseUrl}/${blogId}`, newBlog, config)
  console.log('blogi päivitetty')
  return response.data
}

export default { getAll, setToken, removeToken, create, update }