import { useState } from "react"

import Togglable from "./Togglable"

const Blog = ({ blog }) => {
  //const [showBlog, setVisible] = useState(false)

  console.log(blog)

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
      <button>like</button>
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