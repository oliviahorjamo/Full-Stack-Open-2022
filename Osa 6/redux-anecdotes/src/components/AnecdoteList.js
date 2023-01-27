import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { addNotification, removeNotification } from "../reducers/notificationReducer";
import Filter from './Filter.js'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    return state.anecdotes.filter(a => a.content.includes(state.filter))
  })
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    // tässä kohtaa pitäis kutsua reduceria id:lla
    dispatch(voteAnecdote(id))
    const anecdoteContent = anecdotes.find(a => a.id === id).content
    dispatch(addNotification(`you voted "${anecdoteContent}"`))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
    
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      </div>
  )
}

export default AnecdoteList