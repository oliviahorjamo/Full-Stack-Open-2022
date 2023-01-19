import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  // aseta käyttäjä jossa tiedossa token
  const [user, setUser] = useState(null)
  // aseta käyttäjänimi ja salasana jotka käyttäjä antaa
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    console.log('use effect jotta tarkistetaan onko tiedot jo muistissa')
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

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
  }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    console.log('logging out')
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.removeToken()
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
      {user === null ?
    loginForm() :
    <div>
    <p>Logged in as {user.name}</p>
    <button onClick = {handleLogout}>logout</button>
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
