const Blog = require("../models/blogModel");

const getBlogs = async (req, res) => {
  try {
    let blogs = await Blog.find().populate("comments");
    if (!blogs) {
      req.flash("error", "Blogs not found");
    }
    res.status(200).render("blogs/index.ejs", blogs);
  } catch (err) {
    req.flash("error",err.message)
  
  }
};

const getBlog = async (req, res) => {
  let { id } = req.params;
  try {
    let blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({
        msg: "Blog not found",
      });
    }
    blog.views = blog.views + 1;
    blog = await Blog.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { new: true }
    );
    res.status(200).json({
      blog,
    });
  } catch (err) {
    res.status(400).json({
      msg: "Error in finding blog",
      error: err.message,
    });
  }
};

const createBlog = async (req, res) => {
  let { title, content, category, tags } = req.body;
  tags = tags.split(",").map((tag) => tag.trim());
  let newBlog = new Blog({ title, content, category, tags });
  try {
    const blog = await newBlog.save();
    res.status(200).json({
      msg: "Blog created successfully",
      blog,
    });
  } catch (err) {
    res.status(400).json({
      msg: "Error in creating blog",
      error: err.message,
    });
  }
};

const updateBlog = async (req, res) => {
  let { id } = req.params;
  let newBlog = req.body;
  try {
    let blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({
        msg: "Blog not found",
      });
    }
    blog = await Blog.findByIdAndUpdate(
      id,
      { ...newBlog, updatesAt: Date.now() },
      { new: true }
    );
    res.status(200).json({
      msg: "Blog Updated Successfully",
      blog,
    });
  } catch (err) {
    res.status(400).json({
      msg: "Error updating blog",
      error: err.message,
    });
  }
};

const deleteBlog = async (req, res) => {
  let { id } = req.params;
  try {
    let blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({
        msg: "Blog not found",
      });
    }
    await Blog.findByIdAndDelete(id);
    res.status(200).json({
      msg: "Blog deleted Successfully",
      blog: blog,
    });
  } catch (err) {
    res.status(400).json({
      msg: "Error deleting blog",
      error: err.message,
    });
  }
};

const getBlogsByCategory = async (req, res) => {
  let { category } = req.params;
  try {
    let blogs = await Blog.find({ category: category });
    if (blogs.length == 0) {
      res.status(200).json({
        msg: `No blogs found under the category: ${category}. Please try a different category.`,
      });
    }
    res.status(200).json({
      msg: `Blogs successfully retrieved for the category: ${category}`,
      blogs,
    });
  } catch (err) {
    res.status(400).json({
      msg: "Error deleting blog",
      error: err.message,
    });
  }
};

const getBlogsByTags = async (req, res) => {
  let { tag } = req.params;
  try {
    const blogs = await Blog.find({ tags: { $regex: tag, $options: "i" } });
    if (blogs.length == 0) {
      return res.status(200).json({
        msg: `No blogs found with tag: ${tag}`,
      });
    }
    res.status(200).json({
      msg: "Blogs found successfully",
      blogs,
    });
  } catch (err) {
    res.status(400).json({
      msg: "Error finding blogs by tag",
      error: err.message,
    });
  }
};

module.exports = {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogsByCategory,
  getBlogsByTags,
};
