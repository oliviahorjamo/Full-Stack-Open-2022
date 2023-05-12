import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import MainPage from './components/MainPage'
import UserPage from './components/UserList'
import Footer from './components/Footer'
import User from './components/User'
import Blog from './components/Blog'

import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'
import { setUserToStore } from './reducers/userReducer'

// OPEN QUESTIONS
// Currently the notifications are always set in App
// Due to the asynchronous nature of notification setting, the notification is given slightly
// after the list of blogs is already modified which looks a little clumsy
// If notification setting is moved to reducers, this issue disappears.
// However, this breaks the single responsibility idea a bit and, in addition, the blogReducer
// has to know about the expected message form of notification reducer.
// The question is: Where should the notification be dispatched?
// (In like function dispatched in app, in remove dispatched in blogReducer)
// Is there something wrong with the way comments are added? Currently find the blog from the parameters and then uses the blogId and comment to
// call the blogReducer with calls the service that makes a post request to blog/id/comments. Liking works differently because it requires a put request
// and not a post request.

// STEPS in backend:
// 5. change blog deletion so that the blog is deleted from the user's list of blogs

// NEXT STEPS
// use an hour for styling the app

import { Routes, Route, Link } from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setUserToStore())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  const padding = {
    padding: 5
  }

  return (
    <div className='container'>
      <div>
        <Link style={padding} to='/'>mainpage</Link>
        <Link style={padding} to='/users'>users</Link>
      </div>
      <Footer />
      <Routes>
        <Route path='/' element={<MainPage />}></Route>
        <Route path='/users' element={<UserPage />}></Route>
        <Route path='/users/:id' element={<User />}></Route>
        <Route path='/blogs/:id' element={<Blog />}></Route>
      </Routes>

      
    </div>
  )
}

export default App