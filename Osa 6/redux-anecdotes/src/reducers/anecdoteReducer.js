import { createSlice } from "@reduxjs/toolkit"

const byVotes = (a1, a2) => {
  if (a2.votes > a1.votes) {
    return 1
  } else {
    return -1
  }
}

//a2.votes>a1.votes ? 1 : -1

const getId = () => (100000 * Math.random()).toFixed(0)

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
    voteAnecdote(state, action) {
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

export const { voteAnecdote, addAnecdote,appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer