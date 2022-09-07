import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}


const remove = id => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const updateAll = newObject => {
  console.log('new object phonebookissa', newObject)
  const request = axios.put(baseUrl, newObject)
  return request.then(response => response.data)
}

export default { getAll, create, update, remove ,updateAll}

// nyt ongelmana et palvelimella olevan datan tyyppi on muuttunut
// pitäis keksii tapa palauttaa palvelimelle alkuperänen data

// lisäks sää sovellus edelleen kesken osasta 2c