"use strict";

var _httpErrors = _interopRequireDefault(require("http-errors"));

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _IndexRouter = _interopRequireDefault(require("./src/routes/IndexRouter"));

var _AuthRouter = _interopRequireDefault(require("./src/routes/AuthRouter"));

var _AuthMiddleware = _interopRequireDefault(require("./src/middlewares/AuthMiddleware"));

var _AdminRouter = _interopRequireDefault(require("./src/routes/AdminRouter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])(); // view engine setup

app.set("views", _path["default"].join(__dirname, "views"));
app.set("view engine", "pug");
app.use((0, _morgan["default"])("dev"));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use((0, _cookieParser["default"])("12312fdf"));
app.use(_express["default"]["static"](_path["default"].join(__dirname, "public")));
app.use("/", _IndexRouter["default"]);
app.use("/admin", _AuthRouter["default"]);
app.use("/admin", _AuthMiddleware["default"].requireAuth, _AdminRouter["default"]); // app.use('/app', appRouter);
// app.use('/api/teacher', teacher);
// catch 404 and forward to error handler

app.use(function (req, res, next) {
  next((0, _httpErrors["default"])(404));
}); // error handler

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {}; // render the error page

  res.status(err.status || 500);
  res.render("ErrorView", {
    error: err
  });
});
module.exports = app;