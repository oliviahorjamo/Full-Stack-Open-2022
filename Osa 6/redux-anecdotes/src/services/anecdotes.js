import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const updateVotes = async (id) => {
  console.log('updating in service')
  const response = await axios.get(baseUrl)
  const anecdotes = response.data
  console.log(anecdotes)
  const anecdoteToUpdate = anecdotes.find(a => a.id === id)
  console.log(anecdoteToUpdate)
  const newAnecdote = {...anecdoteToUpdate, votes: anecdoteToUpdate.votes + 1}
  //console.log(newAnecdote)
  //const newAnecdotes = anecdotes.map(a => a.id === id ? newAnecdote : a)
  //console.log(newAnecdotes)
  const responseAnecdote = await axios.put(`${baseUrl}/${id}`, newAnecdote)
  return responseAnecdote.data
}

export default { getAll, createNew, updateVotes }