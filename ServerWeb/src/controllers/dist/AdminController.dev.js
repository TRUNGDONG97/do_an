"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _contant = _interopRequireDefault(require("../util/contant"));

var _funtions = require("../util/funtions");

var _url = _interopRequireDefault(require("url"));

var _pug = _interopRequireDefault(require("pug"));

var _sequelize = _interopRequireWildcard(require("sequelize"));

var _md = _interopRequireDefault(require("md5"));

var _DateUtil = _interopRequireDefault(require("../util/DateUtil"));

var _exceljs = _interopRequireDefault(require("exceljs"));

var _AdminModel = _interopRequireDefault(require("../models/AdminModel"));

var _console = require("console");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getAdmin = function getAdmin(req, res, next) {
  return regeneratorRuntime.async(function getAdmin$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          res.render("AdminView");

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
};

var getCountAdmin = function getCountAdmin(req, res, next) {
  var countAdmin;
  return regeneratorRuntime.async(function getCountAdmin$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_AdminModel["default"].count());

        case 3:
          countAdmin = _context2.sent;
          console.log(countAdmin);
          res.send({
            countAdmin: countAdmin
          });
          return _context2.abrupt("return");

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          res.status(404).send();
          return _context2.abrupt("return");

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

var searchAdmin = function searchAdmin(req, res, next) {
  var currentPage, _ref, _count, rows, newListAdmin, index, admin, pageCount, urlTable, htmlTable;

  return regeneratorRuntime.async(function searchAdmin$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          currentPage = req.body.currentPage;
          console.log("currentPage", currentPage);
          _context3.next = 5;
          return regeneratorRuntime.awrap(_AdminModel["default"].findAndCountAll({
            where: {
              is_active: 1
            },
            offset: _contant["default"].PER_PAGE * (currentPage - 1),
            limit: _contant["default"].PER_PAGE,
            order: [["username", "ASC"]]
          }));

        case 5:
          _ref = _context3.sent;
          _count = _ref.count;
          rows = _ref.rows;
          // console.log(rows,"roew");
          newListAdmin = [];

          for (index = 0; index < rows.length; index++) {
            admin = {};
            admin.username = rows[index].username;
            admin.id = rows[index].id;
            admin.email = rows[index].email;
            admin.name = rows[index].name;
            admin.admin_add = rows[index].admin_add;
            admin.create_date = _DateUtil["default"].formatInputDate(rows[index].create_date);
            newListAdmin.push(admin);
          } // console.log(newListAdmin, "roew");


          pageCount = (0, _funtions.PageCount)(_count);
          urlTable = "".concat(process.cwd(), "/src/table/AdminTable.pug");
          htmlTable = _pug["default"].renderFile(urlTable, {
            admins: newListAdmin,
            STT: (currentPage - 1) * _contant["default"].PER_PAGE,
            currentPage: currentPage,
            pageCount: pageCount,
            pages: (0, _funtions.getArrayPages)(req)(pageCount, currentPage)
          });
          res.send({
            htmlTable: htmlTable
          });
          return _context3.abrupt("return");

        case 17:
          _context3.prev = 17;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);
          res.status(404).send();
          return _context3.abrupt("return");

        case 22:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 17]]);
};

var addAdmin = function addAdmin(req, res, next) {
  var user_name_create, _req$body, username, email, password, countUsername, countEmail;

  return regeneratorRuntime.async(function addAdmin$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          user_name_create = req.signedCookies.username;
          _req$body = req.body, username = _req$body.username, email = _req$body.email, password = _req$body.password;
          _context4.next = 5;
          return regeneratorRuntime.awrap(_AdminModel["default"].count({
            where: {
              username: username,
              is_active: 1
            }
          }));

        case 5:
          countUsername = _context4.sent;

          if (!(countUsername > 0)) {
            _context4.next = 9;
            break;
          }

          res.send({
            result: 0
          });
          return _context4.abrupt("return");

        case 9:
          _context4.next = 11;
          return regeneratorRuntime.awrap(_AdminModel["default"].count({
            where: {
              email: email,
              is_active: 1
            }
          }));

        case 11:
          countEmail = _context4.sent;

          if (!(countEmail > 0)) {
            _context4.next = 15;
            break;
          }

          res.send({
            result: 1
          });
          return _context4.abrupt("return");

        case 15:
          _context4.next = 17;
          return regeneratorRuntime.awrap(_AdminModel["default"].create({
            username: username,
            password: (0, _md["default"])(password),
            email: email,
            admin_add: user_name_create
          }));

        case 17:
          res.send({
            result: 2
          });
          _context4.next = 25;
          break;

        case 20:
          _context4.prev = 20;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0);
          res.status(404).send();
          return _context4.abrupt("return");

        case 25:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 20]]);
};

var deleteAdmin = function deleteAdmin(req, res, next) {
  var id, admin;
  return regeneratorRuntime.async(function deleteAdmin$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          id = parseInt(req.body.id); // console.log(id)

          _context5.prev = 1;
          _context5.next = 4;
          return regeneratorRuntime.awrap(_AdminModel["default"].findAll({
            where: {
              id: id,
              is_active: 1
            }
          }));

        case 4:
          admin = _context5.sent;

          if (!(admin.length > 0)) {
            _context5.next = 11;
            break;
          }

          _context5.next = 8;
          return regeneratorRuntime.awrap(_AdminModel["default"].update({
            is_active: 0
          }, {
            where: {
              id: id
            }
          }));

        case 8:
          res.send({
            result: 1
          });
          _context5.next = 12;
          break;

        case 11:
          res.send({
            result: 0 //Notfound

          });

        case 12:
          return _context5.abrupt("return");

        case 15:
          _context5.prev = 15;
          _context5.t0 = _context5["catch"](1);
          res.status(404).send();
          return _context5.abrupt("return");

        case 19:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[1, 15]]);
};

var _default = {
  getAdmin: getAdmin,
  searchAdmin: searchAdmin,
  addAdmin: addAdmin,
  deleteAdmin: deleteAdmin,
  getCountAdmin: getCountAdmin
};
exports["default"] = _default;