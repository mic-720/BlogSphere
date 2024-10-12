const mongoose = require("mongoose");
const ExpressError = require("../utils/ExpressError");
const Blog = require("../models/blogModel");
const { populate } = require("dotenv");

const getBlogs = async (req, res) => {
  let blogs = await Blog.find().populate("comments");
  if (!blogs) {
    req.flash("error", "No Blogs available");
    res.redirect("blogs/home.ejs"); 
  }
  res.status(200).render("blogs/index.ejs", { blogs });
};

const getBlog = async (req, res) => {
  let { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    req.flash("error", "Invalid blog ID");
    return res.redirect("/blogs");
  }
  
  let blog = await Blog.findById(id)
    .populate({
      path: "comments",
      populate: { path: "author" },
    })
    .populate("author");

  if (!blog) {
    req.flash("error", "Blog not found");
    return res.redirect("/blogs");
  }

  
  await Blog.findByIdAndUpdate(
    id,
    { $inc: { views: 1 } }, 
    { new: true, timestamps: false } 
  );

  
  res.status(200).render("blogs/show.ejs", { blog });
};

const renderNewForm = async (req, res) => {
  console.log(req.user);
  res.render("blogs/new");
};

const renderEditForm = async (req, res) => {
  let { id } = req.params;
  let blog = await Blog.findById(id);
  if (!blog) {
    req.flash("error", "Blog not found");
    res.redirect("/blogs");
  }
  res.status(200).render("blogs/edit.ejs", { blog });
};

const createBlog = async (req, res) => {
  let { title, content, category, tags } = req.body;

  tags = tags.split(",").map((tag) => tag.trim());
  let newBlog = new Blog({ title, content, category, tags });
  newBlog.author = req.user._id;
  if (!newBlog) {
    throw new ExpressError(400, "Please send a valid blog");
  }
  await newBlog.save();
  res.redirect("/blogs");
};

const updateBlog = async (req, res) => {
  let { id } = req.params;
  let { title, content, category, tags } = req.body;

  
  if (tags) {
    tags = tags.split(",").map((tag) => tag.trim());
  }

  
  let blog = await Blog.findById(id);
  if (!blog) {
    return res.status(404).send("Blog not found");
  }

  blog.title = title; 
  blog.content = content; 
  blog.category = category; 
  blog.tags = tags; 
  blog.updatedAt = Date.now(); 

  await blog.save(); 

  res.redirect(`/blogs/${id}`); 
};

const deleteBlog = async (req, res) => {
  let { id } = req.params;
  let blog = await Blog.findById(id);
  await Blog.findByIdAndDelete(id);
  req.flash("success", "Blog deleted");
  res.status(200).redirect("/blogs");
};

const getBlogsByCategory = async (req, res) => {
  let { category } = req.params;

  let blogs = await Blog.find({ category: category });
  if (blogs.length == 0) {
    req.flash(
      "error",
      `No blogs found under the category: ${category}. Please try a different category.`
    );
    return res.redirect("/blogs");
  }
  req.flash("success", `Blogs found under the category: ${category}`);
  res.render("blogs/index.ejs", { blogs });
};

const getBlogsByTags = async (req, res) => {
  let { tag } = req.params;
  const blogs = await Blog.find({ tags: { $regex: tag, $options: "i" } });
  if (blogs.length == 0) {
    req.flash("error", `No blogs found with tag: ${tag}`);
    return res.render("blogs/index.ejs", { blogs });
  }
  req.flash("success", `Blogs found with tag : ${tag}`);
  res.render("blogs/index.ejs", { blogs });
};

const addLikes = async (req, res) => {
  const blogId = req.params.id; 
  const userId = req.user._id; 

  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).send("Blog not found");
    }

    
    const likedIndex = blog.likes.indexOf(userId); 

    if (likedIndex === -1) {
      
      await Blog.findOneAndUpdate(
        { _id: blogId },
        { $addToSet: { likes: userId } }, 
        { new: true, timestamps: false } 
      );
    } else {
      
      await Blog.findOneAndUpdate(
        { _id: blogId },
        { $pull: { likes: userId } }, 
        { new: true, timestamps: false } 
      );
    }

    res.status(200).redirect(`/blogs/${blogId}`); 
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
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
  renderEditForm,
  renderNewForm,
  addLikes,
};
