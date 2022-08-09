var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const initiateMongoServer = require("./config/db");
const cors = require("cors");
const fileUpload = require("express-fileupload");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(
  fileUpload({
    createParentPath: true,
  })
);
app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var profileRouter = require("./routes/profile");
var homepageRouter = require("./routes/homepage");
var adminRouter = require("./routes/admin");
var productRouter = require("./routes/products");
var checkoutRouter = require("./routes/checkout");
var ordersRouter = require("./routes/orders");

app.use("/", indexRouter);
app.use("/api/v1/users/", usersRouter);
app.use("/api/v1/profile", profileRouter);
app.use("/api/v1/homepage", homepageRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/checkout", checkoutRouter);
app.use("/api/v1/orders", ordersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : err;

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

initiateMongoServer();

module.exports = app;
