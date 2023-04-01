import { useDispatch, useSelector } from "react-redux";
import { updateAnecdote } from "../reducers/anecdoteReducer";
//import { addNotification } from "../reducers/notificationReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    return anecdotes.filter(a => a.content.includes(filter))
  })
  anecdotes.sort((a1, a2) => a2.votes - a1.votes)
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(updateAnecdote(id))
    // here set the time dependent notification
    const anecdote = anecdotes.find(a => a.id === id)
    dispatch(setNotification(`you voted ${anecdote.content}`, 4))
    /*
    dispatch(addNotification(`You voted for "${anecdote.content}"`))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 4000)
    */
  }

  return (
    <div>

      <h2>Anecdotes</h2>
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