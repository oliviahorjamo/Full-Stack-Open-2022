import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { notifyWithTimeOut } from "../reducers/notificationReducer"
import { likeBlog, removeBlog } from "../reducers/blogReducer"
import CommentForm from './NewComment'

import { Table, Button } from 'react-bootstrap'

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
      <h1>{blog.title} by {blog.author}</h1>
      <a href={blog.url}>{blog.url}</a>
      <p>Added by {blog.user.name}</p>
      <p>{blog.likes} likes</p>
      <Button onClick={() => like(blog)}>like</Button>
      <CommentList comments={blog.comments}/>
      {canRemove&&<Button onClick={() => remove(blog)}>delete</Button>}
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
        <Table striped>
          <tbody>
            {comments.map(c => (
            <tr key={c.id}>
              <td>
              {c.comment}
              </td>
            </tr>
        ))}

          </tbody>
        </Table>
      <ul>
      </ul>
      </div>
    )
  }
}

export default Blog