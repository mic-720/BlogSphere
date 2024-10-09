const Blog = require("../models/blogModel");
const Comment = require("../models/commentModel");

const createComment = async (req, res) => {
  let { blogId } = req.params;
  let { content } = req.body;
  try {
    let blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({
        msg: "Blog not found",
      });
    }
    const newComment = new Comment({ content });
    blog.comments.push(newComment);
    await newComment.save();
    await blog.save();
    res.status(200).json({
      msg: "Comments created successfully",
      blog,
    });
  } catch (err) {
    res.status(400).json({
      msg: "Error in creating comments",
      error: err.message,
    });
  }
};

const deleteComment = async (req, res) => {
  let { blogId, id } = req.params;
  try {
    let blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({
        msg: "Blog not found",
      });
    }
    let comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({
        msg: "Comment not found",
      });
    }
    blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { comments: id },
      },
      { new: true }
    );
    comment = await Comment.findByIdAndDelete(id);
    res.status(200).json({
      msg: "Comment deleted successfully",
      blog,
    });
  } catch (err) {
    res.status(400).json({
      msg: "Error in deleting comments",
      error: err.message,
    });
  }
};

module.exports = {
  createComment,
  deleteComment,
};
