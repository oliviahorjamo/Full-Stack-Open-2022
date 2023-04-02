import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () =>
  axios.get(baseUrl).then(res => res.data)

export const newAnecdote = content => {
  axios.post(baseUrl, content).then(res => res.data)
}

// request yhen noten päivttämiseen
export const updateAnecdote = anecdote => {
  axios.put(`${baseUrl}/${anecdote.id}`, anecdote)
}
  