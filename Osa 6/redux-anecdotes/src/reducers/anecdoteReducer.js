import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

/*
const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]
*/

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

//const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const votedAnecdote = action.payload
      const id = votedAnecdote.id
      return state.map(a =>
        a.id !== id ? a : votedAnecdote)
    },
    addAnecdote(state, action) {
      const content = action.payload.content
      const newAnecdote = {
        content: content,
        votes: 0,
        id: getId()
      }
      return [...state, newAnecdote]
    },
    appendAnecdote(state, action) {
      console.log('anekdootti dispatchatty')
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
})

// tänne export const getAll funktio
// joka hakee notet ja dispatchaa ne

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

// create an asynchronous action creator for creating a new anecdote
export const createAnecdote = content => {
  console.log('anecdotin luominen')
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    console.log('anekdootti luotu ja tallennettu')
    dispatch(appendAnecdote(newAnecdote))
  }
}

// create an asynchronous action creator for voting
export const updateAnecdote = id => {
  // korvaa tällä id:lla oleva anekdootti serverillä
  // dispatchaa voteAnecdote
  return async dispatch => {
    // anekdootin hakeminen
    // talleta palvelimelle sama anekdootti mut eri votella
    const updatedAnecdote = await anecdoteService.update(id)
    //console.log('updated anecdote', updatedAnecdote)
    dispatch(voteAnecdote(updatedAnecdote))
  }
}

export const {voteAnecdote, addAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer