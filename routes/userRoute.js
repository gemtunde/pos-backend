const express = require("express");
const {
  register,
  login,
  getUserData,
  logout,
} = require("../controllers/userController");
const { isVerifyUser } = require("../middlewares/tokenVerification");
const router = express.Router();

//Auth
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(isVerifyUser, logout);

//user data
router.route("/").get(isVerifyUser, getUserData);
// router.route("/").get(getUserData);

module.exports = router;
