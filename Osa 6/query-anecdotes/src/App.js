// either create the context here or create a specific context creator component
// i'll go with the second one as it is a more elegant solution

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, updateAnecdote } from './requests'
//import AnecdoteContext from './AnecdoteContext'
import { useNotificationDispatch, useNotificationValue } from './AnecdoteContext'
import { setNotification } from './AnecdoteContext'

const App = () => {
  const dispatch = useNotificationDispatch()

  //console.log('notification value', useNotificationValue())
  const queryClient = useQueryClient()

  const updatedAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })

  const handleVote = (anecdote) => {
    console.log('vote')
    console.log('anecdote in app', anecdote)
    // mutatoi tässä anecdote  
    updatedAnecdoteMutation.mutate({...anecdote, votes:anecdote.votes + 1})
    //setNotification(`you voted for ${anecdote.content}`)
    setNotification(`you voted for ${anecdote.content}`, 5)(dispatch)
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
