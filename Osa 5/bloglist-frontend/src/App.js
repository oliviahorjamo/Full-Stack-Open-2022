import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  // aseta käyttäjä jossa tiedossa token
  const [user, setUser] = useState(null)
  // aseta käyttäjänimi ja salasana jotka käyttäjä antaa
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const setNewMessage = (message) => {
    console.log(message)
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 3000)
  }

  // funktio jolla käsitellään käyttäjän sisäänkirjautuminen
  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
  try {
    const user = await loginService.login({
      username, password
    })
    
    // aseta käyttäjä muistiin
    window.localStorage.setItem(
      'loggedBlogappUser', JSON.stringify(user)
    )

    // kutsu login servicen set token funktiota jolla asetetaan
    // tokenin arvo muistiin
    blogService.setToken(user.token)
    setUser(user)
    setUsername('')
    setPassword('')
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

  const loginForm = () => (
    // form käyttäjän sisäänkirjautumiselle
  <form onSubmit = {handleLogin}>
    <div>
      username
        <input
        type='text'
        value={username}
        name='Username'
        onChange={({ target }) => setUsername(target.value)}
        />
    </div>
    <div>
      password
        <input
        type='password'
        value={password}
        name='Password'
        onChange={({target}) => setPassword(target.value)}
        ></input>
    </div>
    <button type='submit'>login</button>
  </form>
  )

  return (

  <div>
    <Notification message={message}/>
    {user === null ?

      loginForm() :
      <div>
      <p>Logged in as {user.name}</p>
      <button onClick = {handleLogout}>logout</button>
      
      <Togglable buttonlabel='new blog' ref={blogFormRef}>
        <BlogForm
          createBlog={addBlog}
        />
      </Togglable>

      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      </div>
    }
  </div>
  )
}

export default App
