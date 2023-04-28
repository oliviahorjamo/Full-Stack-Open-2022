import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'

import LoginForm from './components/Login'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import { notifyWithTimeOut } from './reducers/notificationReducer'
import { initializeBlogs, createNewBlog, updateBlog, removeBlog } from './reducers/blogReducer'
import { logUserIn, logUserOut, setUserToStore } from './reducers/userReducer'

// OPEN QUESTIONS
// Currently the notifications are always set in App
// Due to the asynchronous nature of notification setting, the notification is given slightly
// after the list of blogs is already modified which looks a little clumsy
// If notification setting is moved to reducers, this issue disappears.
// However, this breaks the single responsibility idea a bit and, in addition, the blogReducer
// has to know about the expected message form of notification reducer.
// The question is: Where should the notification be dispatched?
// (In like function dispatched in app, in remove dispatched in blogReducer)

const App = () => {
  const dispatch = useDispatch()

  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const blogFormRef = useRef()


  useEffect(() => {
    dispatch(setUserToStore())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const notifyWith = (message, type='info') => {
    dispatch(notifyWithTimeOut({message: message, type:type}, 3))
  }

  const login = async (username, password) => {
    dispatch(logUserIn({ username, password }))
  }

  const logout = async () => {
    dispatch(logUserOut())
  }

  const createBlogAndNotify = async (newBlog) => {
    try {
      dispatch(createNewBlog(newBlog))
      notifyWith(`A new blog '${newBlog.title}' by '${newBlog.author}' added`)
      blogFormRef.current.toggleVisibility()
    } catch (e) {
      notifyWith(('Error in creating blog'))
    }
  }

  const like = async (blog) => {
    dispatch(updateBlog(blog))
    notifyWith(`A like for the blog '${blog.title}' by '${blog.author}'`)
  }

  const remove = async (blog) => {
    const ok = window.confirm(`Sure you want to remove '${blog.title}' by ${blog.author}`)
    if (ok) {
      dispatch(removeBlog(blog))
    }

  }

  if (!user) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification />
        <LoginForm login={login} />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div>
        {user.name} logged in
        <button onClick={logout}>logout</button>
      </div>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <NewBlog createBlog={createBlogAndNotify} />
      </Togglable>
      <div>
        {blogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            like={() => like(blog)}
            canRemove={user && blog.user.username===user.username}
            remove={() => remove(blog)}
          />
        )}
      </div>
    </div>
  )
}

export default App