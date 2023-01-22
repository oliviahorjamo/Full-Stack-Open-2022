//import { useState } from "react"

import Togglable from './Togglable'

const Blog = ({ blog, handleLike, handleDelete, user }) => {
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

  const deleteBlog = (event) => {
    event.preventDefault()
    if (window.confirm(`Do you really want to remove ${blog.title} by ${blog.author}`)) {
      const blogId = event.target.id
      handleDelete(blogId)
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const additionalInformation = () => {

    if (user.name === blog.user.name) {
      return (
        <div>
          <p>{blog.url}</p>
          <p>likes {blog.likes}</p>
          <button onClick={likeBlog} id={blog.id}>like</button>
          <p>{blog.user.name}</p>
          <button onClick={deleteBlog} id={blog.id}>delete</button>
        </div>
      )
    } else {
      return (
        <div>
          <p>{blog.url}</p>
          <p>likes {blog.likes}</p>
          <button onClick={likeBlog} id={blog.id}>like</button>
          <p>{blog.user.name}</p>
        </div>
      )
    }

  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <Togglable buttonLabel='view'>
        {additionalInformation()}
      </Togglable>

    </div>

  )

}

export default Blog