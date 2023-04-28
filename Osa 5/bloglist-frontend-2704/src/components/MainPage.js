import Notification from "./Notification";
import Togglable from "./Togglable";
import NewBlog from "./NewBlog"
import BlogList from "./BlogList";
import LoginForm from "./LoginForm";

import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { notifyWithTimeOut } from "../reducers/notificationReducer";
import { createNewBlog } from "../reducers/blogReducer";

const MainPage = () => {
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  const user = useSelector(state => state.user)

  

  const createBlog = async (newBlog) => {
    // sit kun kotisivu tehty niin siirrä tää kotisivulle
    try {
      dispatch(createNewBlog(newBlog))
      dispatch(notifyWithTimeOut(`A new blog '${newBlog.title}' by '${newBlog.author}' added`))
      blogFormRef.current.toggleVisibility()
    } catch (e) {
      dispatch(notifyWithTimeOut('Error in creating blog'))
    }
  }

  if (!user) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  return (
    <div>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <NewBlog createBlog = {createBlog} />
      </Togglable>
      <div>
        <BlogList />
      </div>
    </div>
  )
}

export default MainPage