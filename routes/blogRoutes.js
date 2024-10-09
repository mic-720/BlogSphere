const express = require("express");
const router = express.Router();
const {
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogs,
  getBlogsByCategory,
  getBlogsByTags,
} = require("../controllers/blogController");

router.get("/", getBlogs);

//Create route
router.post("/", createBlog);

//Show route
router.get("/:id", getBlog);

//Update route
router.put("/:id", updateBlog);

//Delete route
router.delete("/:id", deleteBlog);

router.get("/category/:category", getBlogsByCategory);

router.get("/tags/:tag", getBlogsByTags);

module.exports = router;
