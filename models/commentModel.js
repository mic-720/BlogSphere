const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  author: {
    type: String,
    default: "Satu Don",
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
