const catchAsyncError = require("./catchAsyncError");
const ErrorHandler = require("../utils/errorhandler");
const User = require("../Models/userModel");
const jwt = require("jsonwebtoken");
exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;
  
  if (!token || token==null) {
     return next(new ErrorHandler("please login to acess this resource", 401));
  }
  const decodData = jwt.decode(token, process.env.JWT_SECRET);
  req.user = await User.findById(decodData.id);
  next();
});
exports.authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      next(new ErrorHandler(`Role ${req.user.role} is not allowed to acess`,403));
    }
    next();
  };
};
