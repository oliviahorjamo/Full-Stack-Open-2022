const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/api/blogs', async(request, response) => {
  const blogs = await Blog.find({})
  response.status(200).json(blogs)
})

blogRouter.post('/api/blogs', async(request, response) => {
  console.log('postissa')
  const body = request.body
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  })
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogRouter.delete('/api/blogs/:id', async(request, response) => {
  console.log('poistetaan blogi')
  const id = request.params.id
  await Blog.findByIdAndRemove(id)
  response.status(204).end()
})

module.exports = blogRouter