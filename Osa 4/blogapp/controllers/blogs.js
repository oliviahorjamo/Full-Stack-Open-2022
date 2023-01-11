const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/api/blogs', async(request, response) => {
  const blogs = await Blog.find({})
  response.status(200).json(blogs)
})

blogRouter.post('/api/blogs', async(request, response) => {
  console.log('postissa')
  const blog = new Blog(request.body)
  await blog.save()
  response.status(201).json(blog)
})

module.exports = blogRouter