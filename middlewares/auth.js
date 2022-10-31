const jwt = require("jsonwebtoken");
const wrapAsync = require("../utils/wrapAsync");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");

module.exports.protect = wrapAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new ErrorResponse("Not authorized 1", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    return next(new ErrorResponse("Not authorized", 401));
  }
});
