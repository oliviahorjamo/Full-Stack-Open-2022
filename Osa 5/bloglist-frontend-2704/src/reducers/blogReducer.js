import { createSlice } from "@reduxjs/toolkit"
import blogService from "../services/blogs"

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
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
  }
}

export const { setBlogs, appendBlog } = blogSlice.actions
export default blogSlice.reducer