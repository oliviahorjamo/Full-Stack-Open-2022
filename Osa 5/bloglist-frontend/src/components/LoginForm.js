import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleSubmit }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const emptyUsernameAndPassword = (event) => {
    event.preventDefault()
    setUsername('')
    setPassword('')
    handleSubmit(username, password)
  }

  // form käyttäjän sisäänkirjautumiselle
  return (
    <div>
      <form onSubmit = {emptyUsernameAndPassword}>
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
            onChange={({ target }) => setPassword(target.value)}
          ></input>
        </div>
        <button type='submit'>login</button>
      </form>
    </div>

  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}

export default LoginForm