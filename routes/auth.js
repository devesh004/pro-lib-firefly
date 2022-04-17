const wrapAsync = require("../utils/wrapAsync");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const ErrorResponse = require("../utils/errorResponse");
const { sendMail } = require("../utils/sendMail");
const { protect } = require("../middlewares/auth");

router.post(
  "/signUp",
  wrapAsync(async (req, res, next) => {
    console.log(req.body);
    const user = req.body;
    const salt = bcrypt.genSaltSync(8);
    const hash_password = bcrypt.hashSync(req.body.password, salt);
    user.password = hash_password;
    const newUser = new User(user);
    const userExist = await User.findOne({ email: newUser.email });

    if (userExist) {
      return next(new ErrorResponse("User already exits!", 400));
    }

    const savedUser = await newUser.save();
    console.log(savedUser);
    const { password, ...others } = savedUser._doc;
    // console.log("OTHERS ARE ", others);
    const accessToken = jwt.sign(
      {
        id: savedUser._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "2d" }
    );
    res.status(200).json({ user: others, accessToken });
  })
);

router.post(
  "/login",
  wrapAsync(async (req, res, next) => {
    const { email, password } = req.body;
    // console.log(req.body);

    const user = await User.findOne({ email: email });
    if (!user) {
      return next(new ErrorResponse("User not found", 404));
    }
    bcrypt.compare(password, user.password, function (err, correct) {
      if (err) {
        return next(new ErrorResponse("Internal Server Error", 500));
      }
      if (correct) {
        const accessToken = jwt.sign(
          {
            id: user._id,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "2d",
          }
        );
        const { password, ...others } = user._doc;
        console.log({ user: others, accessToken });
        res.status(200).json({ user: others, accessToken });
      } else {
        return next(new ErrorResponse("Invalid credentials", 400));
      }
    });
  })
);

router.post(
  "/verifyEmail",
  wrapAsync(async (req, res, next) => {
    const email = req.body.email;
    console.log(email);
    try {
      const otp = Math.floor(100000 + Math.random() * 900000);
      const resu = await sendMail(email, otp);
      const date = Date.now();
      const obj = { otp, created_at: date };
      res.status(200).json(obj);
    } catch (err) {
      console.log(err);
      return next(new ErrorResponse("Email not sent", 500));
    }
  })
);

router.post(
  "/verified",
  protect,
  wrapAsync(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user._id, { isVerified: true });
    res.status(201).json({ msg: "User verified" });
  })
);

router.get(
  "/me",
  protect,
  wrapAsync(async (req, res, next) => {
    let user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return next(new ErrorResponse("User not found", 404));
    }
    // console.log(user);
    res.status(200).json(user);
  })
);

router.post(
  "/verified",
  protect,
  wrapAsync(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user._id, { isVerified: true });
    res.status(201).json({ msg: "User verified" });
  })
);
module.exports = router;
