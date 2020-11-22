// Imports
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");

// Import Routes
const authRoute = require("./routes/auth");
const accountRoute = require("./routes/account");
const uploadRoute = require("./routes/posts");

// Setting Up Everything
dotenv.config();
app.options('*', cors())
app.use(cors());
app.use(bodyParser.json());

// Connect To DB
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true , useUnifiedTopology: true}
  
  // () =>
  // console.log("Connected To DataBase")
);

// Route MiddleWare
app.use("/api/user", authRoute);
app.use("/api/upload/photos", uploadRoute);
app.use("/api/account", accountRoute);

// Routes
app.get("/", (req, res) => {
  res.send("Running 🏃 ");
});

// Listening to Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Our app is running on port ${PORT}`);
});
