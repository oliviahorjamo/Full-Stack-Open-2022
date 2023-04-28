import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {},
  reducers: {
    addNotification(state, action) {
      return action.payload
    },
    removeNotification(state, action) {
      return ''
    },
  }
})

export const notifyWithTimeOut = (message, type='info', milliSeconds=3) => {
  console.log('running notifyWithTimeOut in reducer')
  console.log('notification given', message)
  console.log('notification type', type)
  const notification = { message: message, type: type }
  return async dispatch => {
    dispatch(addNotification(notification))
    setTimeout(() => {
      dispatch(removeNotification())
      console.log('timeout over')
    }, milliSeconds * 1000)
  }
}

export const { addNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer