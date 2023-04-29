import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { notifyWithTimeOut } from "../reducers/notificationReducer"
import { updateBlog, removeBlog } from "../reducers/blogReducer"

const Blog = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const id = useParams().id
  const blogSelected = blogs.find(b => b.id === id)
  const user = useSelector(state => state.user)
  console.log('id in blog compoennt', id)
  console.log('selected blog', blogSelected)
  console.log('all blogs', blogs)

  if (!blogSelected) {
    return (
      <div>
        Blog with id {id} can't be found
      </div>
    )
  }

  const canRemove = user && blogSelected.user.username === user.username

  const like = async (blog) => {
    dispatch(updateBlog(blog))
    dispatch(notifyWithTimeOut(`A like for the blog '${blog.title}' by '${blog.author}'`))
  }

  const remove = async (blog) => {
    const ok = window.confirm(`Sure you want to remove '${blog.title}' by ${blog.author}`)
    if (ok) {
      dispatch(removeBlog(blog))
      dispatch(notifyWithTimeOut(`Blog '${blog.title}' by '${blogSelected.author}' removed`))
    }
  }
  
  return (
    <div>
      <h1>{blogSelected.title} {blogSelected.author}</h1>
      <a href={blogSelected.url}>{blogSelected.url}</a>
      <p>{blogSelected.likes} likes</p>
      <button onClick={() => like(blogSelected)}>like</button>
      <p>Added by {blogSelected.user.name}</p>
      {canRemove&&<button onClick={remove}>delete</button>}
    </div>
  )
}

/*
like={() => like(blog)}
            canRemove={user && blog.user.username===user.username}
            remove={() => remove(blog)}
   
            */

export default Blog