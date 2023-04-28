import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import storageService from './services/storage'

import LoginForm from './components/Login'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import { notifyWithTimeOut } from './reducers/notificationReducer'
import { initializeBlogs, createNewBlog } from './reducers/blogReducer'

// TODO: Store the information about blog bosts in a redux store
// After this the blog posts will not be stored in the state
// Allows creating a BlogList component that finds and renders all the blogs
// Setting blogs will be done in the blog reducer so that App doesn't have to worry
// about calling blogService
// Same when adding blogs: no need to call blogService from App

// STEPS
// Currently the blog to dispatch is correct in reducer
// However, backend keeps giving the error message that jwt has expired
// The issue seems to come from the backend and not the frontend since there nothing actually changed in the post request
// Note that liking and deleting is not going to work after this since there will no longer be setBlogs
// function available
// However, everything else should work normally as the blogs -list is still a parameter in App

const App = () => {
  const dispatch = useDispatch()

  const blogs = useSelector(state => state.blogs)
  console.log('blogs found in useSelector', blogs)

  //const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState('')

  const blogFormRef = useRef()

  useEffect(() => {
    const user = storageService.loadUser()
    setUser(user)
  }, [])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const notifyWith = (message, type='info') => {
    dispatch(notifyWithTimeOut({message: message, type:type}, 3))
  }

  const login = async (username, password) => {
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      storageService.saveUser(user)
      notifyWith('welcome!')
    } catch(e) {
      notifyWith('wrong username or password', 'error')
    }
  }

  const logout = async () => {
    setUser(null)
    storageService.removeUser()
    notifyWith('logged out')
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
    const blogToUpdate = { ...blog, likes: blog.likes + 1, user: blog.user.id }
    const updatedBlog = await blogService.update(blogToUpdate)
    notifyWith(`A like for the blog '${blog.title}' by '${blog.author}'`)
    //setBlogs(blogs.map(b => b.id === blog.id ? updatedBlog : b))
  }

  const remove = async (blog) => {
    const ok = window.confirm(`Sure you want to remove '${blog.title}' by ${blog.author}`)
    if (ok) {
      await blogService.remove(blog.id)
      notifyWith(`The blog' ${blog.title}' by '${blog.author} removed`)
      //setBlogs(blogs.filter(b => b.id !== blog.id))
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
      <Togglable buttonLabel='new note' ref={blogFormRef}>
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