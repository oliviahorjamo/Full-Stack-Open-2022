import { useDispatch, useSelector } from "react-redux";
import Blog from "./Blog";
import { notifyWithTimeOut } from "../reducers/notificationReducer";
import { updateBlog, removeBlog } from "../reducers/blogReducer";

const BlogList = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  console.log('blogs', blogs)

  const like = async (blog) => {
    dispatch(updateBlog(blog))
    dispatch(notifyWithTimeOut(`A like for the blog '${blog.title}' by '${blog.author}'`))
  }

  const remove = async (blog) => {
    const ok = window.confirm(`Sure you want to remove '${blog.title}' by ${blog.author}`)
    if (ok) {
      dispatch(removeBlog(blog))
      dispatch(notifyWithTimeOut(`Blog '${blog.title}' by '${blog.author}' removed`))
    }

  }


  return (
    <div>
        {blogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            like={() => like(blog)}
            canRemove={user && blog.user.username===user.username}
            remove={() => remove(blog)}
          />
        )}
      </div>
  )
}

export default BlogList