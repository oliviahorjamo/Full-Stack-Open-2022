import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { notifyWithTimeOut } from "../reducers/notificationReducer"
import { likeBlog, removeBlog } from "../reducers/blogReducer"
import CommentForm from './NewComment'

const Blog = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const id = useParams().id
  const blog = blogs.find(b => b.id === id)
  const user = useSelector(state => state.user)

  if (!blog) {
    return (
      <div>
        Blog with id {id} can't be found
      </div>
    )
  }

  const canRemove = user && blog.user.username === user.username

  const like = async (blog) => {
    dispatch(likeBlog(blog))
    dispatch(notifyWithTimeOut(`A like for the blog '${blog.title}' by '${blog.author}'`))
  }

  const remove = async (blog) => {
    const ok = window.confirm(`Sure you want to remove '${blog.title}' by ${blog.author}`)
    if (ok) {
      dispatch(removeBlog(blog))
      dispatch(notifyWithTimeOut(`Blog '${blog.title}' by '${blog.author}' removed`))
    }
  }

  console.log('comments', blog.comments)
  
  return (
    <div>
      <h1>{blog.title} {blog.author}</h1>
      <a href={blog.url}>{blog.url}</a>
      <p>{blog.likes} likes</p>
      <button onClick={() => like(blog)}>like</button>
      <p>Added by {blog.user.name}</p>
      <CommentList comments={blog.comments}/>
      {canRemove&&<button onClick={() => remove(blog)}>delete</button>}
      <CommentForm blog={blog}/>
    </div>
  )
}

const CommentList = (props) => {
  const comments = props.comments
  
  if (comments.length === 0) {
    return null
  } else {
    return (
      <div>
        <h2>Comments</h2>
      <ul>
        {comments.map(c => (
          <li key={c.id}>
            {c.comment}
          </li>
        ))}
      </ul>
      </div>
    )
  }
}

export default Blog