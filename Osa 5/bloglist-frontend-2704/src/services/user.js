let token = null

const STORAGE_KEY = 'loggedBlogAppUser'

const setUser = (user) => {
  console.log('user to set to storage', user)
  window.localStorage.setItem(
    STORAGE_KEY, JSON.stringify(user)
  )
  token = user.token
  console.log('user set to storage')
}

const getUser = () => {
  const loggedUserJSON = window.localStorage.getItem(STORAGE_KEY)
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    token = user.token
    return user
  }

  return null
}

const clearUser = () => {
  localStorage.clear()
  token = null
}

const getToken = () => token

export default {
  setUser, getUser, clearUser, getToken
}