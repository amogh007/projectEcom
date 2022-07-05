const express = require("express");
const app = express();
const product = require("./routes/productRoute");
const user = require("./routes/userRoutes");
const cookieParser=require('cookie-parser')
const errorMiddleware = require("../Backend/middleware/error");

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use(errorMiddleware);

module.exports = app;
