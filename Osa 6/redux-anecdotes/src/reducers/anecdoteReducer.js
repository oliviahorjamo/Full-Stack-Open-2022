import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const byVotes = (a1, a2) => {
  if (a2.votes > a1.votes) {
    return 1
  } else {
    return -1
  }
}

//a2.votes>a1.votes ? 1 : -1

//const getId = () => (100000 * Math.random()).toFixed(0)

/*
const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}
*/

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setVotes(state, action) {
      const id = action.payload
      const votedAnecdote = state.find(s => s.id === id)
      const updatedAnecdote = {...votedAnecdote, votes: votedAnecdote.votes+1}
      const newState =  state.map(a =>
        a.id !== id ? a : updatedAnecdote)
      return newState.sort(byVotes)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const inititalAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = id => {
  console.log('voting')
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.updateVotes(id)
    console.log('updatedAnecdote in reducer', updatedAnecdote)
    //const allAnecdotes = await anecdoteService.getAll()
    dispatch(setVotes(updatedAnecdote.id))
  }
}

export const { setVotes, addAnecdote,appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer