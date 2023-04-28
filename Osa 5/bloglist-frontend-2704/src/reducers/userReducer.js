import { createSlice } from "@reduxjs/toolkit"
import loginService from "../services/login"
import userService from "../services/user"
import { notifyWithTimeOut } from "./notificationReducer"

const userSlice = createSlice({
  name: "user",
  initialState: '',
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    removeUser(state, action) {
      return ''
    }
  }
})

export const logUserIn = ({ username, password }) => {
  console.log('user to log in', username)
  return async dispatch => {
    // log user in using user storage
    // set user to local storage
    // dispatch set user action
    // dispatch a notification for logging in
    try {
      console.log('username', username)
      console.log('password', password)
      const user = await loginService.login({ username, password })
      console.log('user was logged in', user)
      userService.setUser(user)
      console.log('user logged in and saved')
      dispatch(notifyWithTimeOut({ message:'welcome!', type:'info' }, 3))
      dispatch(setUser(user))
    } catch(e) {
      dispatch(notifyWithTimeOut({ message: 'wrong username or password', type: 'error' }, 3))
    }
  }
}

export const logUserOut = () => {
  return async dispatch => {
    console.log('logging out')
    dispatch(removeUser())
    userService.clearUser()
    dispatch(notifyWithTimeOut({message: 'Logged out', type: 'info'}, 3))
  }
}

export const setUserToStore = () => {
  return async dispatch => {
    const user = userService.getUser()
    dispatch(setUser(user))
  }

}

export const { setUser, removeUser } = userSlice.actions
export default userSlice.reducer