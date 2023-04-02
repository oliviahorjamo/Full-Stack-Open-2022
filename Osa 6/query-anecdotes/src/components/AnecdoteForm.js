import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, newAnecdote } from '../requests'
import { setNotification } from '../AnecdoteContext'
import { useNotificationDispatch } from '../AnecdoteContext'

const AnecdoteForm = () => {
  const dispatch = useNotificationDispatch()
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation(newAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
    onError: () => {
      setNotification('anecdote too short', 5)(dispatch)
    }
  })
  

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    newAnecdoteMutation.mutate({content, votes: 0})
    // should the new notification be created here in case the mutation doesn't work?
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
