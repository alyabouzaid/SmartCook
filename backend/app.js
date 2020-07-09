const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const formData = require("express-form-data");
const mongoose = require("mongoose");
require("dotenv").config();

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const journalsRouter = require("./routes/journals");
const imagesRouter = require("./routes/images");
const serverRouter = require("./routes/server");
const foodPicturesRouter = require("./routes/foodPictures");

const app = express();
// TODO: dotenv not working

// mongoose connection
// const uri =
//   "mongodb+srv://smartcook_436:SCook-436@smartcook436.sln0r.mongodb.net/dev?retryWrites=true&w=majority";

const uri = process.env.ATLAS_URL;
mongoose.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});
// mongoose
//   .connect("mongodb://localhost/ReactReduxExpressMongo")
//   .then(() => console.log("connection successful"))
//   .catch((err) => console.error(err));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(formData.parse());
app.use(bodyParser.json());

// all routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
// google authentication routes
app.use("/", serverRouter);
// journal feature routes
app.use("/journals", journalsRouter);
app.use("/images", imagesRouter);
// food pictures feature routes
app.use("/foodPictures", foodPicturesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
