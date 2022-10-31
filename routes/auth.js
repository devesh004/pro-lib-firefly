const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/auth");
const {
  registerUser,
  loginUser,
  getUser,
  markVerify,
  sendVerificationEMail,
} = require("../controllers/auth");

router.route("/signup").post(registerUser);

router.route("/login").post(loginUser);

router.route("/sendmail").post(sendVerificationEMail);

router.route("/verified").post(markVerify);

router.route("/me").get(protect, getUser);

module.exports = router;
