require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const config = require("./config/config");
const globalErrorHandler = require("./middlewares/globalErrorHandler");
const createHttpErrors = require("http-errors");

const app = express();

const PORT = config.port;
connectDB();

//middlewares
app.use(express.json());

//endpoints
app.get("/", (req, res) => {
  //   const err = createHttpErrors(404, "something went wrong!!!");
  //   throw err;
  res.json({ message: "Helo from pos server" });
});

//user auth
app.use("/api/user", require("./routes/userRoute"));

//global error handler
app.use(globalErrorHandler);

//server
app.listen(PORT, () => {
  console.log(`pos server is running on port ${PORT}`);
});
