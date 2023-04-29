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
  console.log('in blog service removing')
  console.log('headers', headers)
  await axios.delete(`${baseUrl}/${id}`, { headers })
}


export default { getAll, create, update, remove }