const helper = require('../utils/test_helper.js')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const blog = require('../models/blog')

// kirjota before each joka tyhjentää testitietokannan ja tallentaa sinne tietyt blogit
// tarkista et tulokset samat kun oletetaan

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('when there are inititally some notes saved', () => {
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
  
  test('a specific blog blog is within the blogs', async () => {
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
})


describe('adding a valid blog', () => {

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'testtitle3',
    url: 'testiurl'
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
    title: 'testtitle',
    url: 'testiurl'
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
})


describe('adding an invalid blog', () => {

  test('blog with missing title receives status code 400', async () => {
    const newBlog = {
      url: 'jeeurl'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('blog with missing url receives status code 400', async () => {
    const newBlog = {
      title: 'testititle'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
    
    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const titles = blogsAtEnd.map(b => b.title)

    expect(titles).not.toContain(blogToDelete.title)

  })
})

describe('updating the number of likes of a blog', () => {
  test('succeeds with status code 200 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const newBlog = {
      title: blogToUpdate.title,
      url: blogToUpdate.url,
      author: blogToUpdate.author,
      likes: blogToUpdate.likes + 1
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(newBlog)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()

    updatedBlog = blogsAtEnd.filter(b => {
      console.log(b)
      return b.id === blogToUpdate.id
    })

    expect(updatedBlog[0].likes).toBe(blogToUpdate.likes + 1)
  })
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