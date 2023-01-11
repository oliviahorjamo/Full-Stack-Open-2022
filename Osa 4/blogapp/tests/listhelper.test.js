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

  helper.initialBlogs.forEach(async (blog) => {
    let blogObject = new Blog(blog)
    await blogObject.save()
    console.log('saved')
  })
  console.log('before each done')
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