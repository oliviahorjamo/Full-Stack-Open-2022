import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import anecdoteService from '../services/anecdotes'

const NewAnecdote = () => {
  const dispatch = useDispatch()

  const addNewAnecdote = async (event) => {
    event.preventDefault()
    // content löytyy eventin content kentästä
    const content = event.target.content.value
    // aseta kentän arvo tyhjäksi stringiksi
    event.target.content.value = ''
    // tää pitäis voida tehdä kokonaan reducerin funktioiden avulla
    dispatch(createAnecdote(content))
    //const newAnecdote = await anecdoteService.createNew(content)
    //dispatch(addAnecdote(newAnecdote))
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