const express = require("express");
const {
  registerUser,
  loginUser,
  forgotPassword,
} = require("../controller/authController");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);

module.exports = router;
