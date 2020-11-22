// Import's
const mongoose = require("mongoose");

// User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 3,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024,
  },
  uploads: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PhotoSchema",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Export's
module.exports = mongoose.model("User", userSchema);
