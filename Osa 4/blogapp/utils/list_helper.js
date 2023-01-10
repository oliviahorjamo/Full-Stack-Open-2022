
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

module.exports = {
  totalLikes,
  favoriteBlog
}