import { useState } from 'react'

import { Form, Button } from 'react-bootstrap'

const BlogForm = ({createBlog}) => {

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log('event', event)
    const title = event.target.title.value
    const author = event.target.author.value
    const url = event.target.url.value
    await createBlog({ title, author, url })
  }

  return (
    <div>
      <h4>Create a new blog</h4>

      <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>title</Form.Label>
        <Form.Control
          type='text'
          name='title'
        />
        <Form.Label>author</Form.Label>
        <Form.Control
          type='text'
          name='author'
        />
        <Form.Label>url</Form.Label>
        <Form.Control
          type='text'
          name='url'
        />
        <Button variant='primary' type='submit'>
          create
        </Button>
      </Form.Group>
      </Form>
    </div>
  )
}

export default BlogForm