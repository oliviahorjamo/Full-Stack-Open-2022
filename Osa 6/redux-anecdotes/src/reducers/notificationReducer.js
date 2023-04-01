import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    // a reducer for setting the notification
    addNotification(state, action) {
      // sets the payload of the action as the current state of the notification
      return action.payload
    },
    removeNotification(state, action) {
      return ''
    },
  }
})

export const setNotification = (content, seconds) => {
  return async dispatch => {
    console.log('dispatching the notification')
    dispatch(addNotification(content))
    setTimeout(() => {
      dispatch(removeNotification())
    }, seconds * 1000)
  }
}

export const { addNotification, removeNotification, createNotificationWithTime } = notificationSlice.actions
export default notificationSlice.reducer