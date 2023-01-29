import { useState } from "react";
import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
  const [content, setContent] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    // tähän reducerin kutsuminen
    event.preventDefault()
    dispatch(createAnecdote(content))
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