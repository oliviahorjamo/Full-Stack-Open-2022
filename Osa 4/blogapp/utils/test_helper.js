
const Blog = require('../models/blog')


const initialBlogs = [
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  },
  {
    title: 'testtitle 2',
    author: 'author 2',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 3,
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovwthissoon' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

/*

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length !== 0) {
    max = blogs.reduce((prev, current) => (prev.y > current.y) ? prev : current)
  } else {
    max = null
  }
  return max
}

// nämä vielä tekemättä (4.6 ja 4.7)
const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  const authors = {}

}

*/

module.exports = {
  nonExistingId,
  blogsInDb,
  initialBlogs
}