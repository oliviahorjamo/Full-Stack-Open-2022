import { useState } from "react";
import { useDispatch } from "react-redux";
import { appendAnecdote } from "../reducers/anecdoteReducer";
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const [content, setContent] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    // tähän reducerin kutsuminen
    event.preventDefault()
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
    setContent('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <input
        name='content'
        value={content}
        onChange={({target}) => setContent(target.value)}
        />
        <button type='submit'>
          create
        </button>
      </form>
    </div>
  )
}

export default AnecdoteForm