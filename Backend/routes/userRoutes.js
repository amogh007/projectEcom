const express = require("express");
const {
  registerUser,
  loginUser,
  logOutUser,
  beep,
} = require("../controller/userController");
const Router = express.Router();

Router.route("/register").post(registerUser);
Router.route("/login").post(loginUser);
Router.route("/logout").get(logOutUser);

module.exports = Router;
