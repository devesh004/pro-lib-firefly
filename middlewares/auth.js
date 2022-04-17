const jwt = require("jsonwebtoken");
const wrapAsync = require("../utils/wrapAsync");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/user");

// const verifyToken = (req, res, next) => {
//   const authHeader = req.headers.token;
//   // console.log(authHeader);
//   const token = authHeader.split(" ")[1];
//   // console.log("TOKEN ", token);
//   if (token) {
//     jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
//       if (err) {
//         console.log("TOKEN ERRORRRR    ", err);
//         res.status(403).json("Token not valid!");
//       }
//       req.user = data;
//       // console.log("GOT THE USER   ", req.user);
//       next();
//     });
//   } else {
//     return res.status(401).json("SORRY You don't have any token");
//   }
// };

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

module.exports.verifyTokenAndAuth = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res
        .status(403)
        .json("You don't have permission to proceed this operation");
    }
  });
};

module.exports.verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res
        .status(403)
        .json("You don't have permission to proceed this operation");
    }
  });
};
