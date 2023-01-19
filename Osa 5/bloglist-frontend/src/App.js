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
  }, [])

  // funktio jolla käsitellään käyttäjän sisäänkirjautuminen
  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
  try {
    const user = await loginService.login({
      username, password
    })
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
