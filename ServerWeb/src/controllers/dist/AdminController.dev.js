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

var searchAdmin = function searchAdmin(req, res, next) {
  var currentPage, _ref, count, rows, newListAdmin, index, admin, pageCount, urlTable, htmlTable;

  return regeneratorRuntime.async(function searchAdmin$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          currentPage = req.body.currentPage;
          console.log("currentPage", currentPage); // console.log("nameEmployee", nameEmployee);

          _context2.next = 5;
          return regeneratorRuntime.awrap(_AdminModel["default"].findAndCountAll({
            where: {
              // [Op.and]: [
              //   sequelize.where(sequelize.fn("lower", sequelize.col("last_name")), {
              //     [Op.like]: "%" + nameEmployee + "%",
              //   }),
              //   sequelize.where(sequelize.fn("lower", sequelize.col("phone")), {
              //     [Op.like]: "%" + phoneEmployee + "%",
              //   }),
              //   {
              is_active: 1 //   },
              // ],

            },
            offset: _contant["default"].PER_PAGE * (currentPage - 1),
            limit: _contant["default"].PER_PAGE,
            order: [["username", "ASC"]]
          }));

        case 5:
          _ref = _context2.sent;
          count = _ref.count;
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


          pageCount = (0, _funtions.PageCount)(count);
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
          return _context2.abrupt("return");

        case 17:
          _context2.prev = 17;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);
          res.status(404).send();
          return _context2.abrupt("return");

        case 22:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 17]]);
};

var _default = {
  getAdmin: getAdmin,
  searchAdmin: searchAdmin
};
exports["default"] = _default;