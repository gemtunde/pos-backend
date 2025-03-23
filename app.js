require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");

const app = express();

const PORT = process.env.PORT || 8000;
connectDB();

app.get("/", (req, res) => {
  res.json({ message: "Helo from pos server" });
});

app.listen(PORT, () => {
  console.log(`pos server is running on port ${PORT}`);
});
