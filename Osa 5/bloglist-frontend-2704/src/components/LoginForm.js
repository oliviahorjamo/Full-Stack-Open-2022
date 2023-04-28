import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { logUserIn } from '../reducers/userReducer'

const LoginForm = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    await login(username, password)
  }

  const login = async (username, password) => {
    dispatch(logUserIn({ username, password }))
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        username
        <input
          id='username'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id='password'
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id='login-button' type="submit">
        login
      </button>
    </form>
  )
}

export default LoginForm