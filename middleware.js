const Blog = require("./models/blogModel");
const Comment = require("./models/commentModel");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "you must be logged in to create listing");
    return res.redirect("/auth/signin");
  }
  next();
};

module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
  let blog = await Blog.findById(id);
  if (!blog.author.equals(req.user._id)) {
    res.redirect(`/blogs/${id}`);
  }
  next();
};

module.exports.isCommentOwner = async (req, res, next) => {
  let { blogId, id } = req.params;
  let comment = await Comment.findById(id);
  if (!comment.author.equals(res.locals.currUser._id)) {
    return res.redirect(`/blogs/${blogId}`);
  }
  next();
};

module.exports.savedRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};
