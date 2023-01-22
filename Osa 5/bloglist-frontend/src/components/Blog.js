//import { useState } from "react"

import Togglable from "./Togglable"

const Blog = ({ blog, handleLike }) => {
  //const [showBlog, setVisible] = useState(false)

  const likeBlog = (event) => {
    event.preventDefault()

    const blogId = event.target.id

    const blogObject = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    handleLike(blogObject, blogId)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const additionalInformation = () => (
    <div>
      <p>{blog.url}</p>
      <p>likes {blog.likes}</p>
      <button onClick={likeBlog} id={blog.id}>like</button>
      <p>{blog.user.name}</p>
    </div>
  )

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <Togglable buttonlabel='view'>
        {additionalInformation()}
      </Togglable>

    </div>  

  )

}

export default Blog