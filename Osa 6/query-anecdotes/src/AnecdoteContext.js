// code for creating a context for the app

import { createContext, useContext, useReducer } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      console.log('setting the notification')
      return action.payload
    case "REMOVE":
      return ""
    default:
      return state
  }
}

const AnecdoteContext = createContext()

export const AnecdoteContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, "")

  return (
    <AnecdoteContext.Provider value = {[notification, notificationDispatch]} >
      {props.children}
    </AnecdoteContext.Provider>
  )
}

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(AnecdoteContext)
  return notificationAndDispatch[0]
}


export const useNotificationDispatch = () => {
  console.log('calling the useNotificationDispatch')
  const notificationAndDispatch = useContext(AnecdoteContext)
  return notificationAndDispatch[1]
}


export const setNotification = (content, seconds) => {
  console.log('set notification called')
  return async dispatch => {
    console.log('dispatching the notification')
    dispatch({type:'SET', payload: content})
    setTimeout(() => {
      dispatch({type:'REMOVE'})
    }, seconds * 1000)
  }
}


export default AnecdoteContext