const Blog = require("../models/blogModel");
const Comment = require("../models/commentModel");

const createComment = async (req, res) => {
  let { blogId } = req.params;
  let { content } = req.body;
  let blog = await Blog.findById(blogId);
  if (!blog) {
    req.flash("error", "Blog not found");
    return res.redirect("/blogs");
  }
  const newComment = new Comment({ content });
  newComment.author = req.user._id;
  blog.comments.push(newComment);
  await newComment.save();
  await blog.save();
  res.status(200).redirect(`/blogs/${blogId}`);
};

const deleteComment = async (req, res) => {
  let { blogId, id } = req.params;

  let blog = await Blog.findById(blogId);
  let comment = await Comment.findById(id);
  blog = await Blog.findByIdAndUpdate(
    blogId,
    {
      $pull: { comments: id },
    },
    { new: true }
  );
  comment = await Comment.findByIdAndDelete(id);

  req.flash("success", "Comment deleted successfully");
  res.status(200).redirect(`/blogs/${blogId}/`);
};

module.exports = {
  createComment,
  deleteComment,
};
