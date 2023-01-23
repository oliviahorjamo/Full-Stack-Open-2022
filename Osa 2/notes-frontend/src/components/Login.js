const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            type='username'
            value={username}
            onChange={handleUsernameChange}>
          </input>
        </div>
        <div>
          password
          <input
            type='password'
            value={password}
            onChange={handlePasswordChange}>
          </input>
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm