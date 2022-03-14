const express = require("express");
const {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  getUserProfile,
  updatePassword,
} = require("../controller/authController");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);

router.route("/me").get(isAuthenticatedUser, getUserProfile);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);

module.exports = router;
