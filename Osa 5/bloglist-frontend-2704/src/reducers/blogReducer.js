import { createSlice } from "@reduxjs/toolkit"
import blogService from "../services/blogs"
import { notifyWithTimeOut } from "./notificationReducer"

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    likeBlog(state, action) {
      const likedBlog = action.payload
      const id = likedBlog.id
      return state.map(b =>
        b.id !== id ? b : likedBlog)
    },
    deleteBlog(state, action) {
      const deletedBlogId = action.payload.id
      console.log('id in deleteBlog action', deletedBlogId)
      return state.filter(b => b.id !== deletedBlogId)
    },
    sortBlogs(state, action) {
      return state.sort(
        (b1, b2) => b2.likes - b1.likes
      )
    }
  }
})

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    const byLikes = (b1, b2) => b2.likes - b1.likes
    const sortedBlogs = blogs.sort(byLikes)
    dispatch(setBlogs(sortedBlogs))
  }
}

export const createNewBlog = (blog) => {
  console.log('blog to create', blog)
  return async dispatch => {
    const createdBlog = await blogService.create(blog)
    dispatch(appendBlog(createdBlog))
    dispatch(sortBlogs())
  }
}

export const updateBlog = blog => {
  return async dispatch => {
    console.log('blog user id', blog.user.id)
    const blogToUpdate = { ...blog, likes: blog.likes + 1, user: blog.user.id }
    console.log('blog to update', blogToUpdate)
    const updatedBlog = await blogService.update(blogToUpdate)
    console.log('updatedBlog', updatedBlog)
    dispatch(likeBlog(updatedBlog))
    dispatch(sortBlogs())
  }
}

export const removeBlog = blog => {
  return async dispatch => {
    console.log('deleting blog', blog)
    await blogService.remove(blog.id)
    console.log('blog deleted')
    dispatch(deleteBlog(blog))
  }
}

export const { setBlogs, appendBlog, likeBlog, deleteBlog, sortBlogs } = blogSlice.actions
export default blogSlice.reducer