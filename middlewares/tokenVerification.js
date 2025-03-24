const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const User = require("../models/userModel");

const isVerifyUser = async (req, res, next) => {
  try {
    const { accessToken } = req.cookies;

    if (!accessToken) {
      const error = createHttpError(401, "Please provide token!!");
      return next(error);
    }
    const decodedToken = jwt.verify(accessToken, config.accessTokenSecret);
    // if (!decodedToken) {
    //   const error = createHttpError(401, "Invalid token!!");
    //   return next(error);
    // }
    const user = await User.findById(decodedToken._id);
    if (!user) {
      const error = createHttpError(401, "User not exist!!");
      return next(error);
    }
    req.user = user;
    next();
  } catch (error) {
    const err = createHttpError(401, "Error in Invalid token!!");
    next(err);
  }
};

module.exports = { isVerifyUser };
