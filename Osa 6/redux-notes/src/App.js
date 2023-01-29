import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import NewNote from './components/NewNote'
import Notes from './components/Notes'
import VisibilityFilter from './components/VisibilityFilter'
import { initalizeNotes, setNotes } from './reducers/noteReducer'
import noteService from './services/notes'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initalizeNotes())
  }, [dispatch])

  return (
    <div>
      <NewNote />
      <VisibilityFilter />
      <Notes  />
    </div>
  )
}

export default App