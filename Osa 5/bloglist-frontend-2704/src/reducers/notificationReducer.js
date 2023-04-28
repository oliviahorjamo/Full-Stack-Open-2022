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

export const notifyWithTimeOut = (notification, milliSeconds) => {
  console.log('running notifyWithTimeOut in reducer')
  console.log('notification given', notification)
  return async dispatch => {
    dispatch(addNotification(notification))
    setTimeout(() => {
      dispatch(removeNotification())
    }, milliSeconds * 1000)
  }
}

export const { addNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer