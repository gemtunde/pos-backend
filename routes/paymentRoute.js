const express = require("express");

const { createOrder } = require("../controllers/paymentController");
const { isVerifyUser } = require("../middlewares/tokenVerification");

const router = express.Router();

//routes
router.route("/create-order").post(isVerifyUser, createOrder);

//export
module.exports = router;
