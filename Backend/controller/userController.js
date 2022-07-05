const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../Models/userModel");
const bcrypt = require("bcrypt");
const sendToken = require("../utils/JWTtoken");

exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name: name,
    email: email,
    password: password,
    avatar: {
      public_id: "this is public id ",
      url: "this is profile pic url",
    },
  });
  sendToken(user,201,res)
});

exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email|| !password) {
    return next(new ErrorHandler("please enter email id and password", 400));
  }
  const user =await  User.findOne({ email: email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("please signup", 400));
  }
  const isPassword =user.comparePassword(password)
  if (!isPassword) {
    return next(
      new ErrorHandler("please enter valid email id or password", 401)
    );
  }
  sendToken(user,200,res)
});
