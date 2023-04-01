import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  console.log('luodaan anekdootti servicessa')
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

/*
const id = action.payload
      console.log('äänestettiin', id)
      const anecdoteToVote = state.find(a => a.id === id)
      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }
      return state.map(a =>
        a.id !== id ? a : votedAnecdote)
        */

const update = async (id) => {
  console.log('päivitetään anekdoottia servicessä')
  // vaihtoehdot: hae pelkkä valittu anekdootti ja päivitä sitä putilla
  // hae kaikki, korvaa vaan haluttu anekdootti ja päivitä kaikki putilla
  // eka ei taida toimia koska palvelimella on vaan yks json kaikista anekdooteista
  const response = await axios.get(`${baseUrl}/${id}`)
  const anecdoteToVote = response.data
  //const anecdoteToVote = allAnecdotes.find(a => a.id === id)
  //console.log('voted', anecdoteToVote)
  const votedAnecdote = {
    ...anecdoteToVote,
    votes: anecdoteToVote.votes + 1
  }
  const updatedResponse = await axios.put(`${baseUrl}/${id}`, votedAnecdote)
  console.log(updatedResponse.data)
  return updatedResponse.data

}

export default { getAll, createNew, update }