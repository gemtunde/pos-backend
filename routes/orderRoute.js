const express = require("express");
const {
  addOrder,
  getAllOrders,
  updateOrder,
  getOrderById,
} = require("../controllers/orderController");
const { isVerifyUser } = require("../middlewares/tokenVerification");

const router = express.Router();

//routes
router.route("/").post(isVerifyUser, addOrder);
router.route("/").get(isVerifyUser, getAllOrders);
router.route("/:id").get(isVerifyUser, getOrderById);
router.route("/:id").put(isVerifyUser, updateOrder);

//export
module.exports = router;
