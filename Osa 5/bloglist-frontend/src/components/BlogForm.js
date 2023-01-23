// a form for creating a new blogpost

import { useState } from 'react'

// form blogien lisäämiseen
const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>

      <form onSubmit={addBlog}>
        <h2>create new blog</h2>
        <div>
          title:
          <input
            type='text'
            value={title}
            name='title'
            placeholder='title'
            id='title-field'
            onChange={({ target }) => setTitle(target.value)}
          >
          </input>
        </div>
        <div>
          author:
          <input
            type='text'
            value={author}
            name='author'
            placeholder='author'
            id='author-field'
            onChange={({ target }) => setAuthor(target.value)}
          >
          </input>
        </div>
        <div>
          url:
          <input
            type='text'
            value={url}
            name='url'
            placeholder='url'
            id='url-field'
            onChange={({ target }) => setUrl(target.value)}
          ></input>
        </div>
        <button type='submit' id='create-button'>create</button>
      </form>

    </div>
  )
}

export default BlogForm