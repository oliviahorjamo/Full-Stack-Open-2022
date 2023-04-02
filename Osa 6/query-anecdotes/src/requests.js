import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () => 
  axios.get(baseUrl).then(res => res.data)
  /*
  try {
    axios.get(baseUrl).then(res => res.data)
  } catch {
    throw new Error('anecdote too short')
  }
  */

export const newAnecdote = async content => {
  try {
    await axios.post(baseUrl, content).then(res => res.data)
  } catch {
    console.log('error catched')
    throw new Error('anecdote too short')
  }
  // implement an error handling function here that returns an error
  // if the anecdote is too short
}

// request yhen noten päivttämiseen
export const updateAnecdote = anecdote => {
  axios.put(`${baseUrl}/${anecdote.id}`, anecdote)
}
  