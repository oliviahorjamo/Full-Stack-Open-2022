import { configureStore } from "@reduxjs/toolkit";

import anecdoteReducer, { appendAnecdote, setAnecdotes } from "./reducers/anecdoteReducer";
import filterReducer from "./reducers/filterReducer";
import notificationReducer from "./reducers/notificationReducer";
import anecdoteService from './services/anecdotes'

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    notification: notificationReducer
  }
})

// tää pitää muuttaa niin että riittää kutsua yhtä funktiota reducerista
/*
anecdoteService.getAll().then(anecdotes =>
  anecdotes.forEach(a => {
    store.dispatch(appendAnecdote(a))
  }))
*/

export default store