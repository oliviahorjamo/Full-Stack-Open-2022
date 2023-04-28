import { useSelector, useDispatch } from "react-redux"
import Notification from "./Notification"
import { logUserOut } from "../reducers/userReducer"

const Footer = () => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.user)

  const logout = async () => {
    dispatch(logUserOut())
  }

  if (user) {
    return (
      <div>
        <h2>blogs</h2>
      <Notification />
      <div>
        {user.name} logged in
        <button onClick={logout}>logout</button>
      </div>
      
      </div>
    )
  }
}

export default Footer