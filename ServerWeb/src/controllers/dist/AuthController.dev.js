"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _AdminModel = _interopRequireDefault(require("../models/AdminModel"));

var _validator = require("validator");

var _md = _interopRequireDefault(require("md5"));

var _contant = _interopRequireDefault(require("../util/contant"));

var _cryptoJs = _interopRequireDefault(require("crypto-js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var login = function login(req, res, next) {
  return regeneratorRuntime.async(function login$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          res.render("LoginView");

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
};

var logout = function logout(req, res, next) {
  var token;
  return regeneratorRuntime.async(function logout$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          token = req.signedCookies.token;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_AdminModel["default"].update({
            token: null
          }, {
            where: {
              token: token
            }
          }));

        case 3:
          res.cookie("token", "");
          res.cookie("password", "");
          res.cookie("username", "");
          res.redirect("login");

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var postLogin = function postLogin(req, res) {
  var user_name, password, user, timeNow, token;
  return regeneratorRuntime.async(function postLogin$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          console.log(req.body);
          user_name = req.body.username.trim();
          password = (0, _md["default"])(req.body.password.trim()); // console.log(req.body.password)
          // console.log(password,"oasasa")
          // console.log(user_name)
          // var hashPass = md5(123456)
          // console.log(hashPass)

          if (!(0, _validator.isEmpty)(user_name)) {
            _context3.next = 6;
            break;
          }

          res.render("LoginView", {
            error: "Bạn chưa nhập tên đăng nhập",
            value: req.body
          });
          return _context3.abrupt("return");

        case 6:
          if (!(0, _validator.isEmpty)(req.body.password.trim())) {
            _context3.next = 9;
            break;
          }

          res.render("LoginView", {
            error: "Bạn chưa nhập mật khẩu",
            values: req.body
          });
          return _context3.abrupt("return");

        case 9:
          _context3.prev = 9;
          _context3.next = 12;
          return regeneratorRuntime.awrap(_AdminModel["default"].findAll({
            where: {
              username: user_name,
              password: password
            }
          }));

        case 12:
          user = _context3.sent;

          if (!(user.length > 0)) {
            _context3.next = 24;
            break;
          }

          // console.log()
          timeNow = new Date().getTime();
          token = _cryptoJs["default"].AES.encrypt(timeNow.toString(), password).toString(); // console.log(token);

          _context3.next = 18;
          return regeneratorRuntime.awrap(_AdminModel["default"].update({
            token: token
          }, {
            where: {
              id: user[0].id
            }
          }));

        case 18:
          res.cookie("token", token, _contant["default"].OPTION); // res.cookie('password', user[0].password, Constants.OPTION)

          res.cookie("username", user[0].username, _contant["default"].OPTION);
          res.redirect("home");
          return _context3.abrupt("return");

        case 24:
          console.log("tk ko tồn tại");
          res.render("LoginView", {
            error: "Bạn nhập sai tài khoản hoặc mật khẩu",
            values: req.body
          });
          return _context3.abrupt("return");

        case 27:
          _context3.next = 34;
          break;

        case 29:
          _context3.prev = 29;
          _context3.t0 = _context3["catch"](9);
          console.log(_context3.t0, "error");
          res.render("ErrorView", {
            error: _context3.t0
          });
          return _context3.abrupt("return");

        case 34:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[9, 29]]);
};

var _default = {
  login: login,
  logout: logout,
  postLogin: postLogin
};
exports["default"] = _default;