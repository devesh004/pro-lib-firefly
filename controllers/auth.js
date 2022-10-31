const User = require("../models/User.js");
const ErrorResponse = require("../utils/ErrorResponse.js");
const wrapAsync = require("../utils/wrapAsync.js");

// @desc     Register a user
// @route    POST /api/auth/register
// @access   Public
module.exports.registerUser = wrapAsync(async (req, res, next) => {
  const { email } = req.body;

  const olduser = await User.findOne({ email });
  if (olduser) {
    return next(new ErrorResponse("Email already registered", 400));
  }

  const user = await User.create(req.body);

  const token = user.getJWT();

  res.status(200).json({ ...user, token });
});

// @desc     Login a user
// @route    POST /api/auth/login
// @access   Public
module.exports.loginUser = wrapAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse("Missing credentials", 400));
  }

  // check for user
  const user = await User.findOne({ email: email });
  if (!user) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  // check if password matches
  const match = await user.matchPassword(password);
  if (!match) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  const token = user.getJWT();

  res.status(200).json({ ...user, token });
});

// @desc     Get loggedin user
// @route    GET /api/auth/me
// @access   Private
module.exports.getUser = wrapAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("-password");
  res.status(200).json(user);
});

// @desc     Mark user as verified
// @route    POST /api/auth/verified
// @access   Private
module.exports.markVerify = wrapAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user._id, { isVerified: true });
  res.status(201).json({ msg: "User verified" });
});

// @desc     Send otp to user email for verification
// @route    POST /api/auth/sendmail
// @access   Private
module.exports.sendVerificationEMail = wrapAsync(async (req, res, next) => {
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
});
