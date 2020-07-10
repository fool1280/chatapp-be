var express = require("express");
var logger = require("morgan");
var cors = require("cors");
var socketApi = require("./socketApi");
const mongoose = require("mongoose");
require("dotenv").config();

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

app.use(logger("dev"));
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.DB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to database"));

app.use("/", indexRouter);
app.use("/users", usersRouter);

app.use(process.env.PORT || 5000);

var io = socketApi.io;
io.attach(app);

module.exports = app;
