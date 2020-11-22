// Import's
const mongoose = require("mongoose");

// Upload Schema
const PostSchema = mongoose.Schema({
  photo: {
    type: Buffer,
  },
  title: {
    type: String,
    required: true,
    min: 3,
    max: 100,
  },
  description: {
    type: String,
    required: true,
    min: 3,
    max: 1024,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  FDate: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

PostSchema.methods.toJSON = function () {
  const result = this.toObject();
  delete result.post;
  return result;
};

// Export's
const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
