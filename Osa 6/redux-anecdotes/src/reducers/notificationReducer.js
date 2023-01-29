import { createSlice } from "@reduxjs/toolkit";
//import { useDispatch } from "react-redux";

const initialState = null
//let dispatch = useDispatch()

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification(state, action) {
      const notification = action.payload
      return notification
    },
    removeNotification(state, action) {
      return null
    }
  }
})

export const setNotificationWithTimeout = (content, time) => {
  return async dispatch => {
    await dispatch(addNotification(content))
    setTimeout(() => {
      dispatch(removeNotification())
    }, time * 1000)
  }
}

export const { addNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer