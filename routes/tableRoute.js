const express = require("express");
const { isVerifyUser } = require("../middlewares/tokenVerification");
const {
  addTable,
  getTables,
  updateTable,
} = require("../controllers/tableController");

const router = express.Router();

//routes
router.route("/").post(isVerifyUser, addTable);
router.route("/").get(isVerifyUser, getTables);
router.route("/:id").put(isVerifyUser, updateTable);

//export
module.exports = router;
