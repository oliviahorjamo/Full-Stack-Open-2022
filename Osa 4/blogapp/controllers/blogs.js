const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/api/blogs', async(request, response) => {
  console.log('api blogs getiss')
  const blogs = await Blog.find({})
  response.status(200).json(blogs)
})

blogRouter.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

module.exports = blogRouter