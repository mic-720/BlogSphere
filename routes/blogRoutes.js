const wrapAsync = require("../utils/wrapAsync");
const express = require("express");
const router = express.Router();
const {isLoggedIn,isOwner} = require("../middleware")
const {
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogs,
  getBlogsByCategory,
  getBlogsByTags,
  renderEditForm,
  renderNewForm,
  addLikes
} = require("../controllers/blogController");

router.get("/", wrapAsync(getBlogs));

//Create route
router.post("/",isLoggedIn,wrapAsync(createBlog));

//Get new form
router.get("/new", isLoggedIn,renderNewForm);

//Get edit form
router.get("/:id/edit", isLoggedIn,isOwner,wrapAsync(renderEditForm));

//Show route
router.get("/:id", wrapAsync(getBlog));

//Update route
router.put("/:id",isLoggedIn,isOwner, wrapAsync(updateBlog));

//Delete route
router.delete("/:id",isLoggedIn,isOwner, wrapAsync(deleteBlog));

router.get("/category/:category", wrapAsync(getBlogsByCategory));

router.get("/tags/:tag", wrapAsync(getBlogsByTags));

// Route to handle liking a blog post
router.post('/:id/like', addLikes );



module.exports = router;
