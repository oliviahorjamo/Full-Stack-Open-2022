// import the functions needed for finding the context
import {useNotificationValue} from "../AnecdoteContext"

const Notification = () => {
  const notification = useNotificationValue()
  console.log('notification', notification)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
 // if (true) return null

  // return the notification gotten from the context
  return (
    <div style={style}>
      {notification}   
    </div>
  )
}

export default Notification
