import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { useNavigate } from "react-router-dom";

const NewAnecdote = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const addNewAnecdote = async (event) => {
    event.preventDefault()
    // content löytyy eventin content kentästä
    const content = event.target.content.value
    event.target.content.value = ''
    dispatch(createAnecdote(content))
    navigate('/')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit = {addNewAnecdote}>
        <input name='content' />
        <button type='submit'>create</button>
      </form>
    </div>
    
  )
}

export default NewAnecdote