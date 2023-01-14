//const jwt = require('jsonwebtoken')
const blogRouter = require('express').Router()
const { request, response } = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    return authorization.substring(7)
  }
  return null
}

blogRouter.get('/', async(request, response) => {
  console.log('getissä blog routerissa')
  console.log(request.body)
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
  response.status(200).json(blogs)
})

blogRouter.post('/', async(request, response) => {
  body = request.body
  const user = body.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async(request, response) => {
  
  const user = request.body.user
  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    response.status(404).json({
      error: 'this blog has already been deleted'
    })
  }

  if (blog.user.toString() === user.id.toString()) {
    const blogId = request.params.id
    await Blog.findByIdAndRemove(blogId)
    response.status(204).end()
  } else {
    return response.status(401).json({ error: 'no right to delete this blog' })
  }

})

blogRouter.put('/:id', async(request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  
  response.status(200).json(updatedBlog)
})

module.exports = blogRouter