import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { commentBlog } from "../reducers/blogReducer";
import { notifyWithTimeOut } from "../reducers/notificationReducer";
import { useParams } from "react-router-dom";
import { Form, Button } from 'react-bootstrap'

const NewComment = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const id = useParams().id
  const blog = blogs.find(b => b.id === id)
  

  const handleSubmit = async (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    event.target.comment.value = ''
    dispatch(commentBlog(blog, comment))
    dispatch(notifyWithTimeOut(`added comment ${comment} for blog ${blog.title}`))
  }

  return (
    <div>
      <h4>
        comment blog
      </h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control
            type='text'
            name='comment'
          />
        </Form.Group>
        <Button type='submit'>send comment</Button>
      </Form>
    </div>
  )
}

export default NewComment