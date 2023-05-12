const jwt = require("jsonwebtoken");
const blogRouter = require("express").Router();

const Blog = require("../models/blog");
const Comment = require("../models/comment");

const { userExtractor } = require("../utils/middleware");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({})
    .populate("user", { username: 1, name: 1 })
    .populate("comments", { comment: 1 });
  response.status(200).json(blogs);
});

blogRouter.post("/", userExtractor, async (request, response) => {
  const { title, author, url, likes } = request.body;
  const blog = new Blog({
    title,
    author,
    url,
    likes: likes ? likes : 0,
  });

  const user = request.user;

  if (!user) {
    return response.status(401).json({ error: "operation not permitted" });
  }

  blog.user = user._id;

  let createdBlog = await blog.save();

  user.blogs = user.blogs.concat(createdBlog._id);
  await user.save();

  createdBlog = await Blog.findById(createdBlog._id)
    .populate("user")
    .populate("comments");

  response.status(201).json(createdBlog);
});

blogRouter.delete("/:id", userExtractor, async (request, response) => {
  const blogToDelete = await Blog.findById(request.params.id);
  if (!blogToDelete) {
    return response.status(204).end();
  }

  if (blogToDelete.user && blogToDelete.user.toString() !== request.user.id) {
    return response.status(401).json({
      error: "only the creator can delete a blog",
    });
  }

  const filterForIdToRemove = { id: request.params.id };

  await Blog.findOneAndDelete(filterForIdToRemove);

  response.status(204).end();
});

blogRouter.put("/:id", async (request, response) => {
  const blog = request.body;

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .populate("user", { username: 1, name: 1 })
    .populate("comments", { comment: 1 });

  response.status(200).json(updatedBlog);
});

blogRouter.post("/:id/comments", userExtractor, async (request, response) => {
  console.log("request body", request.body);

  const commentText = request.body.comment;
  const blogId = request.params.id;
  console.log("comment in blog route", commentText);
  console.log("blogId", blogId);

  const user = request.user;
  console.log(user);

  if (!user) {
    return response.status(401).json({ error: "operation not permitted" });
  }

  const comment = new Comment({
    comment: commentText,
    blog: blogId,
  });

  let createdComment = await comment.save();

  blogCommented = await Blog.findById(blogId);
  blogCommented.comments = blogCommented.comments.concat(createdComment._id);

  await blogCommented.save();

  response.status(200).json(createdComment);
});

module.exports = blogRouter;
