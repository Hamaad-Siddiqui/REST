// Imports
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require('cors')
// Import Routes
const authRoute = require("./routes/auth");
const accountRoute = require("./routes/account");

// Setting Up Everything
dotenv.config();
app.use(cors())
app.use(bodyParser.json());

// Connect To DB
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true }
  // () =>
  // console.log("Connected To DataBase")
);

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
