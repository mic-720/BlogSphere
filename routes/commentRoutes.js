const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  createComment,
  deleteComment,
} = require("../controllers/commentController");

//Create route
router.post("/", createComment);

//Delete route
router.delete("/:id", deleteComment);

module.exports = router;
