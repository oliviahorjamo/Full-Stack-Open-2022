import { useSelector } from "react-redux"
import { Alert } from "react-bootstrap"


const Notification = () => {
  const notification = useSelector(state => state.notification)
  console.log('current notification', notification)

  if (notification.message) {
    if (notification.type == 'info') {
      return (
        <div className='container'>
          <Alert variant='success'>
            {notification.message}
          </Alert>
        </div>
      )
    } else {
      return (
        <div className='container'>
          <Alert variant='danger'>
            {notification.message}
          </Alert>
        </div>
      )
    }
  }
}

export default Notification