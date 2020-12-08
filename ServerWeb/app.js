import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";

import indexRouter from "./src/routes/IndexRouter";
import authRouter from "./src/routes/AuthRouter";
import authMiddleware from "./src/middlewares/AuthMiddleware";
import adminRouter from "./src/routes/AdminRouter";

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("12312fdf"));
app.use(express.static(path.join(__dirname, "public")));

app.use("/",authMiddleware.requireAuth ,indexRouter);
app.use("/admin", authRouter);
app.use("/admin", authMiddleware.requireAuth, adminRouter);
// app.use('/app', appRouter);

// app.use('/api/teacher', teacher);

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
  res.render("ErrorView", {
    error: err,
  });
});

module.exports = app;
