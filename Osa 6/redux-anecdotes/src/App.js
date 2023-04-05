import NewAnecdote from './components/AnecdoteForm'
import Home from './components/Home'
import Footer from './components/Footer'
import { useEffect } from 'react'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'


const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])

  const padding = {
    padding: 5
  }

  // show a list of anecdotes at anecdotes at /
  // show a page for creating a new anecdote at create
  // show a link called about ?
  // create a Footer for the app

  // notification, filter ja anecdotelist siirtyy home komponenttiin
  // new anecdote ei tarvii siirtyy mihinkää vaan voi olla oma komponenttinsa

  return (
    <div>
      <Router>
      <div>
        <Link style={padding} to='/'>anecdotes</Link>
        <Link style={padding} to='/create'>create new</Link>
        <Link style={padding} to='/about'>about</Link>
      </div>

      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/create' element={<NewAnecdote />}></Route>
      </Routes>
    </Router>
    <Footer />
    </div>
    
  )
}

/*

      <Notification />
      <Filter />
      <AnecdoteList />
      */

export default App