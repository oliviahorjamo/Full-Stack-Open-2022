import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  // aseta käyttäjä jossa tiedossa token
  const [user, setUser] = useState(null)
  // aseta käyttäjänimi ja salasana jotka käyttäjä antaa
  const [message, setMessage] = useState('')

  const blogFormRef = useRef()

  useEffect(() => {
    FindBlogs()
    //blogService.getAll().then(blogs =>
    //  setBlogs( blogs )
    //)
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const FindBlogs = async () => {
    let blogs = await blogService.getAll()
    blogs = blogs.sort(function(a, b) {
      if (a.likes < b.likes) return 1
      if (a.likes > b.likes) return -1
      return 0
    })
    setBlogs(blogs)
  }

  const setNewMessage = (message) => {
    console.log(message)
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 3000)
  }

  // funktio jolla käsitellään käyttäjän sisäänkirjautuminen
  const handleLogin = async (username, password) => {
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      // kutsu login servicen set token funktiota jolla asetetaan
      // tokenin arvo muistiin
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      console.log('error')
      console.log(exception)
      setNewMessage('wrong username or password')
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    console.log('logging out')
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.removeToken()
  }

  const addBlog = (blogObject) => {

    blogFormRef.current.toggleVisibility()

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      })

    setNewMessage(
      `a new blog ${blogObject.title} added`
    )
  }

  const likeBlog = (blogObject, blogId) => {
    blogService
      .update(blogObject, blogId)
      .then(FindBlogs)
  }

  const deleteBlog = (blogId) => {
    blogService
      .remove(blogId)
      .then(FindBlogs)
  }

  return (

    <div>
      <Notification message={message}/>

      {user === null ?

        <LoginForm handleSubmit={handleLogin}/> :
        <div>
          <p>Logged in as {user.name}</p>
          <button onClick = {handleLogout}>logout</button>
          <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <BlogForm
              createBlog={addBlog}
            />
          </Togglable>

          <h2>blogs</h2>
          {blogs.map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              handleLike={likeBlog}
              handleDelete={deleteBlog}
              user={user}
            />
          )}
        </div>
      }
    </div>
  )
}

export default App
