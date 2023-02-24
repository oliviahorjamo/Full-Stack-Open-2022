import { connect } from "react-redux"

const FindStyle = (notification) => {
  if (!notification) {
    return {
      visible: 'null'
    }
  } else {
    return {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
  }
}

const Notification = (props) => {
  //const notification = useSelector(state => state.notification)

  /*
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (!props.state) {
    console.log(props.state)
    
  }
  */

  const style = FindStyle(props.notification)

  return (
    <div style={style}>
      <p>{props.notification}</p>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification