const listHelper = require('../utils/list_helper.js')

listWithOneBlog = [
  {
  _id: '5a422aa71b54a676234d17f8',
  title: 'Go To Statement Considered Harmful',
  author: 'Edsger W. Dijkstra',
  url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
  likes: 5,
  __v: 0
}
]

listWithThreeBlogs = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f9',
    title: 'testtitle 2',
    author: 'author 2',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 3,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f10',
    title: 'testtitle 3',
    author: 'author 3',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  } 
]

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