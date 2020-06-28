// Imports
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
// Import Routes
const authRoute = require("./routes/auth");
const accountRoute = require("./routes/account");

// Setting Up The Env Variable
dotenv.config();

// Connect To DB
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true }
  // () =>
  // console.log("Connected To DataBase")
);

// Converting Posts to JSON with BodyParser
app.use(bodyParser.json());

// Route MiddleWare
app.use("/api/user", authRoute);
app.use("/account", accountRoute);

// Routes
app.get("/", (req, res) => {
  res.send("HomePage");
});

// Listening to Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Our app is running on port ${PORT}`);
});
