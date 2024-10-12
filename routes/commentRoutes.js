const wrapAsync = require("../utils/wrapAsync")
const express = require("express");
const router = express.Router({ mergeParams: true });
const {isLoggedIn,isCommentOwner} = require("../middleware")

const {
  createComment,
  deleteComment,
} = require("../controllers/commentController");

//Create route
router.post("/", isLoggedIn,wrapAsync(createComment));

//Delete route
router.delete("/:id",isLoggedIn,isCommentOwner, wrapAsync(deleteComment));

module.exports = router;
