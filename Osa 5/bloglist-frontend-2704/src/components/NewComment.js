import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { commentBlog } from "../reducers/blogReducer";
import { notifyWithTimeOut } from "../reducers/notificationReducer";
import { useParams } from "react-router-dom";

const NewComment = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const id = useParams().id
  const blog = blogs.find(b => b.id === id)
  
  const [comment, setComment] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    dispatch(commentBlog(blog, comment))
    dispatch(notifyWithTimeOut(`added comment ${comment} for blog ${blog.title}`))
    setComment('')
  }

  return (
    <div>
      <h4>
        comment blog
      </h4>
      <form onSubmit={handleSubmit}>
        <div>
          comment
          <input
          id = 'comment'
          placeholder = 'comment'
          value = {comment}
          onChange={({ target }) => setComment(target.value)}
          />
        </div>
        <button type='submit'>send comment</button>
      </form>
    </div>
  )
}

export default NewComment