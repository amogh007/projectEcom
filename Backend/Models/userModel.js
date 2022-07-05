const mongoose = require("mongoose");
const Validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = mongoose.Schema({
  name: {
    required: [true, "please enter your name"],
    type: String,
    maxLength: [30, "name should not exceed 30 characters"],
    minLength: [4, "name should be minimum of 4 characters"],
  },
  email: {
    required: [true, "please enter the emailId"],
    type: String,
    unique: true,
    validate: [Validator.isEmail, "enter the valid email"],
  },
  password: {
    required: [true, "please enter your password"],
    type: String,
    minLength: [8, "password should be at least 8 characters"],
    select: false,
  },
  avatar: {
    public_id: {
      required: true,
      type: String,
    },
    url: {
      required: true,
      type: String,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};
userSchema.methods.comparePassword = async function (passw) {
  return await bcrypt.compare(passw, this.password);
};
module.exports = mongoose.model("User", userSchema);
