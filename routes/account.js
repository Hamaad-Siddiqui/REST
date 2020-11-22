// Import's
const router = require("express").Router();
const verify = require("./verifyToken");
const User = require("../models/User");

router.get("/", verify, async (req, res) => {
  // Sending User Information Back
  const Details = await User.findOne({ _id: req.user });
  console.log(Details)
  if (Details)
    return res.send({
      name: Details.name,
      email: Details.email,
      uploads: Details.uploads,
      Date: Details.date,
      FDate: Details.FDate,
    });
});
// router.get("/validate", verify, async (req, res) => {
//   const Details = await User.findOne({ _id: req.user });
//   if (Details) return res.status(200);
// });

module.exports = router;
