require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const config = require("./config/config");
const globalErrorHandler = require("./middlewares/globalErrorHandler");
// const cookieParser = require("cookie-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
// const createHttpErrors = require("http-errors");

const app = express();

const PORT = config.port;
connectDB();
const Localhost = "http://localhost:5173 ";
//middlewares
// app.use(
//   cors({
//     credentials: true,
//     origin: ["http://localhost:5173"],
//   })
// );
app.use(
  cors({
    origin: Localhost ?? process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

//endpoints
app.get("/", (req, res) => {
  //   const err = createHttpErrors(404, "something went wrong!!!");
  //   throw err;
  res.json({ message: "Helo from pos server" });
});

//user auth
app.use("/api/user", require("./routes/userRoute"));

//order
app.use("/api/order", require("./routes/orderRoute"));

//tables
app.use("/api/table", require("./routes/tableRoute"));

//payment
app.use("/api/payment", require("./routes/paymentRoute"));

//global error handler
app.use(globalErrorHandler);

//server
app.listen(PORT, () => {
  console.log(`pos server is running on port ${PORT}`);
});
