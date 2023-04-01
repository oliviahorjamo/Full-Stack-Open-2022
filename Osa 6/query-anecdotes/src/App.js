import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes } from './requests'

const App = () => {

  const handleVote = (anecdote) => {
    console.log('vote')
  }

  
  const result = useQuery(
    'anecdotes', getAnecdotes,
    {
      retry: false
    }
  )
  
  console.log(result)

  if (result.isError) {
    return (
      <div>
        <p>
          anecdote service is not available due to server error
        </p>
      </div>
    )
  }

  if (result.isLoading) {
    return (
      <div>
        <p>
          loading data
        </p>
      </div>
    )
  }
  
  /*
  const anecdotes = [
    {
      "content": "If it hurts, do it more often",
      "id": "47145",
      "votes": 0
    },
  ]
  */

  const anecdotes = result.data
  console.log('anecdotes', anecdotes)

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
