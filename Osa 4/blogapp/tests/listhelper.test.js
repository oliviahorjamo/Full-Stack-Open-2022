const helper = require('../utils/test_helper.js')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

// kirjota before each joka tyhjentää testitietokannan ja tallentaa sinne tietyt blogit
// tarkista et tulokset samat kun oletetaan

beforeEach(async () => {
  await Blog.deleteMany({})
  console.log('cleared db')

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)

 console.log('each note saved')
})

test('blog list contains the correct number of blogs', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('correct blog is within the blogs', async () => {
  const response = await api.get('/api/blogs')
  const titles = response.body.map(r => r.title)
  expect(titles).toContain(
    'Go To Statement Considered Harmful'
  )
})

test('unique identifier is named id', async () => {
  const response = await api.get('/api/blogs')
  response.body.forEach(blog => {
    expect(blog.id).toBeDefined()
  }
  )
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'testtitle3'
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(b => b.title)
  expect(titles).toContain(
    'testtitle3'
  )
})

test('missing like property is set to 0', async () => {
  const newBlog = {
    title: 'testtitle'
  }

  console.log('testing that missing likes works')

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  console.log('added to database')

  allBlogs = await helper.blogsInDb()

  const addedBlog = allBlogs.filter(b => {
    return b.title === newBlog.title
  })

  console.log(addedBlog[0])

  expect(addedBlog[0].likes).toBe(0)
  
})

afterAll(() => {
  mongoose.connection.close()
})

/*
describe('total likes', () => {

  test('when list has only one blog, equals, the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('of list with three entires correct', () => {
    const result = listHelper.totalLikes(listWithThreeBlogs)
    expect(result).toBe(13)
  })
})

describe('object with max likes', () => {

  test('is itself in a list of one object', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual(listWithOneBlog[0])
  })

  test('is correct in a long list of objects', () => {
    const result = listHelper.favoriteBlog(listWithThreeBlogs)
    expect(result).toEqual(listWithThreeBlogs[listWithThreeBlogs.length -1])
  })

  test('is null when given an empty list', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toEqual(null)
  })
})

*/