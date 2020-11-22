// Import's
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { registerValidation, loginValidation } = require("../validation");

// The Register
router.post("/register", async (req, res) => {
  // Validating User Request
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // Checking if the User exists
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email Already Exists");
  // Hashing the Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  // Create a New User
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const today = new Date();
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    FDate: today.toLocaleDateString("en-US", options),
  });
  try {
    const savedUser = await user.save();
    res.send("Account Created Successfully");
  } catch (err) {
    res.status(400).send(err);
  }
});
// The Login
router.post("/login", async (req, res) => {
  // Validating User Request
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // Checking if the User doesn't exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email Or Password is Incorrect");
  // Checking if the Password ain't correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Email Or Password is Incorrect");
  // Create and Assign a JWT
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("Auth-Token", token).send(token);
});
// Export's
module.exports = router;
