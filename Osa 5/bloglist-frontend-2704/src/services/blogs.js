import axios from 'axios'
import userService from '../services/user'
const baseUrl = '/api/blogs'

const headers = {
  'Authorization': userService.getUser() ? `Bearer ${userService.getUser().token}` : null
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async (object) => {
  const request = await axios.post(baseUrl, object, { headers })
  return request.data
}

const update = async (object) => {
  const request = await axios.put(`${baseUrl}/${object.id}`, object, { headers })
  return request.data
}

const remove = async (id) => {
  await axios.delete(`${baseUrl}/${id}`, { headers })
}

const createComment = async (blogId, object) => {
  const request = await axios.post(`${baseUrl}/${blogId}/comments/`, object, { headers })
  return request.data
}

export default { getAll, create, update, remove, createComment }