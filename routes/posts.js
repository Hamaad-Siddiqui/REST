const express = require("express");
const multer = require("multer");
const Post = require("../models/Post");
const User = require("../models/User");
const verify = require("./verifyToken");
const Router = express.Router();

const upload = multer({
  limits: {
    fileSize: 3000000, // max file size 3MB = 3000000 bytes
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png)$/)) {
      cb(new Error("The following image format is not supported"));
    }
    cb(undefined, true); // Continue with upload
  },
});
Router.post(
  "/",
  verify,
  upload.single("photo"),
  async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.user });
      const details = req.query;
      const file = req.file.buffer;
      console.log(file)
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }; // add category details
      const today = new Date();
      const post = new Post({
        photo: file,
        title: details.title,
        description: details.description,
        category: details.category,
        price: details.price,
        user: user.name,
        userId: user._id,
        FDate: today.toLocaleDateString("en-US", options),
      });
      await post.save();
      res.status(201).send("Post Uploaded Successfully");
    } catch (error) {
      console.log(error);
      res.status(400).send({
        upload_error: "Error while posting try again later",
      });
    }
  },
  (error, req, res, next) => {
    if (error) {
      res.status(400).send({
        upload_error: error.message,
      });
    }
  }
);

Router.get("/", async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).send(posts.reverse());
  } catch (error) {
    res.status(500).send({ get_error: "Error while getting list of posts" });
  }
});

Router.get("/:id", async (req, res) => {
  try {
    const result = await Post.findById(req.params.id);
    res.set("Content-Type", "image/jpeg");
    res.status(200).send(result.photo);
  } catch (error) {
    res.status(500).send({ get_error: "Error while getting post" });
  }
});

module.exports = Router;
