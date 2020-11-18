"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _EmployeeModel = _interopRequireDefault(require("../models/EmployeeModel"));

var _contant = _interopRequireDefault(require("../util/contant"));

var _funtions = require("../util/funtions");

var _url = _interopRequireDefault(require("url"));

var _pug = _interopRequireDefault(require("pug"));

var _sequelize = _interopRequireWildcard(require("sequelize"));

var _md = _interopRequireDefault(require("md5"));

var _DateUtil = _interopRequireDefault(require("../util/DateUtil"));

var _exceljs = _interopRequireDefault(require("exceljs"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getEmployee = function getEmployee(req, res, next) {
  return regeneratorRuntime.async(function getEmployee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          res.render("EmployeeView");

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
};

var searchEmployee = function searchEmployee(req, res, next) {
  var _req$body, currentPage, phoneEmployee, nameEmployee, _ref, count, rows, pageCount, urlTable, htmlTable;

  return regeneratorRuntime.async(function searchEmployee$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body = req.body, currentPage = _req$body.currentPage, phoneEmployee = _req$body.phoneEmployee, nameEmployee = _req$body.nameEmployee; // console.log("phoneEmployee", phoneEmployee);
          // console.log("nameEmployee", nameEmployee);

          _context2.next = 4;
          return regeneratorRuntime.awrap(_EmployeeModel["default"].findAndCountAll({
            where: _defineProperty({}, _sequelize.Op.and, [_sequelize["default"].where(_sequelize["default"].fn("lower", _sequelize["default"].col("last_name")), _defineProperty({}, _sequelize.Op.like, "%" + nameEmployee + "%")), _sequelize["default"].where(_sequelize["default"].fn("lower", _sequelize["default"].col("phone")), _defineProperty({}, _sequelize.Op.like, "%" + phoneEmployee + "%")), {
              is_active: 1
            }]),
            offset: _contant["default"].PER_PAGE * (currentPage - 1),
            limit: _contant["default"].PER_PAGE,
            order: [["last_name", "ASC"]]
          }));

        case 4:
          _ref = _context2.sent;
          count = _ref.count;
          rows = _ref.rows;
          pageCount = (0, _funtions.PageCount)(count);
          urlTable = "".concat(process.cwd(), "/src/table/EmployeeTable.pug");
          _context2.next = 11;
          return regeneratorRuntime.awrap(_pug["default"].renderFile(urlTable, {
            employees: rows,
            STT: (currentPage - 1) * _contant["default"].PER_PAGE,
            currentPage: currentPage,
            pageCount: pageCount,
            pages: (0, _funtions.getArrayPages)(req)(pageCount, currentPage)
          }));

        case 11:
          htmlTable = _context2.sent;
          res.send({
            htmlTable: htmlTable
          });
          return _context2.abrupt("return");

        case 16:
          _context2.prev = 16;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);
          res.status(404).send();
          return _context2.abrupt("return");

        case 21:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 16]]);
};

var addEmployee = function addEmployee(req, res, next) {
  var _req$body2, first_name, last_name, phone, birthday, address, email, gener, position, countPhone, countEmail, newEmployee;

  return regeneratorRuntime.async(function addEmployee$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _req$body2 = req.body, first_name = _req$body2.first_name, last_name = _req$body2.last_name, phone = _req$body2.phone, birthday = _req$body2.birthday, address = _req$body2.address, email = _req$body2.email, gener = _req$body2.gener, position = _req$body2.position;
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(_EmployeeModel["default"].count({
            where: {
              phone: phone,
              is_active: 1
            }
          }));

        case 4:
          countPhone = _context3.sent;

          if (!(countPhone > 0)) {
            _context3.next = 8;
            break;
          }

          res.send({
            result: 0
          });
          return _context3.abrupt("return");

        case 8:
          _context3.next = 10;
          return regeneratorRuntime.awrap(_EmployeeModel["default"].count({
            where: {
              email: email,
              is_active: 1
            }
          }));

        case 10:
          countEmail = _context3.sent;

          if (!(countEmail > 0)) {
            _context3.next = 14;
            break;
          }

          res.send({
            result: 1
          });
          return _context3.abrupt("return");

        case 14:
          _context3.next = 16;
          return regeneratorRuntime.awrap(_EmployeeModel["default"].create({
            first_name: first_name,
            last_name: last_name,
            phone: phone,
            password: (0, _md["default"])(phone),
            birthday: birthday,
            address: address,
            email: email,
            gener: gener,
            position: position
          }));

        case 16:
          newEmployee = _context3.sent;
          // console.log
          res.send({
            result: 3
          });
          return _context3.abrupt("return");

        case 21:
          _context3.prev = 21;
          _context3.t0 = _context3["catch"](1);
          console.log(_context3.t0);
          res.status(404).send();
          return _context3.abrupt("return");

        case 26:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 21]]);
};

var saveEmployee = function saveEmployee(req, res, next) {
  var _req$body3, first_name, last_name, phone, birthday, address, email, gener, position, idEmployee, employee, countPhone, countEmail, newEmployee;

  return regeneratorRuntime.async(function saveEmployee$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _req$body3 = req.body, first_name = _req$body3.first_name, last_name = _req$body3.last_name, phone = _req$body3.phone, birthday = _req$body3.birthday, address = _req$body3.address, email = _req$body3.email, gener = _req$body3.gener, position = _req$body3.position, idEmployee = _req$body3.idEmployee;
          _context4.prev = 1;
          _context4.next = 4;
          return regeneratorRuntime.awrap(_EmployeeModel["default"].findAll({
            where: {
              id: idEmployee,
              is_active: 1
            }
          }));

        case 4:
          employee = _context4.sent;

          if (!(employee.length > 0 && phone !== employee[0].phone)) {
            _context4.next = 12;
            break;
          }

          _context4.next = 8;
          return regeneratorRuntime.awrap(_EmployeeModel["default"].count({
            where: {
              phone: phone,
              is_active: 1
            }
          }));

        case 8:
          countPhone = _context4.sent;

          if (!(countPhone > 0)) {
            _context4.next = 12;
            break;
          }

          res.send({
            result: 0
          });
          return _context4.abrupt("return");

        case 12:
          if (!(employee.length > 0 && email !== employee[0].email)) {
            _context4.next = 19;
            break;
          }

          _context4.next = 15;
          return regeneratorRuntime.awrap(_EmployeeModel["default"].count({
            where: {
              email: email,
              is_active: 1
            }
          }));

        case 15:
          countEmail = _context4.sent;

          if (!(countEmail > 0)) {
            _context4.next = 19;
            break;
          }

          res.send({
            result: 1
          });
          return _context4.abrupt("return");

        case 19:
          if (!(employee.length <= 0)) {
            _context4.next = 22;
            break;
          }

          res.send({
            result: 2
          });
          return _context4.abrupt("return");

        case 22:
          _context4.next = 24;
          return regeneratorRuntime.awrap(_EmployeeModel["default"].update({
            first_name: first_name,
            last_name: last_name,
            phone: phone,
            birthday: birthday,
            address: address,
            email: email,
            gener: gener,
            position: position
          }, {
            where: {
              id: idEmployee
            }
          }));

        case 24:
          newEmployee = _context4.sent;
          res.send({
            result: 3
          });
          return _context4.abrupt("return");

        case 29:
          _context4.prev = 29;
          _context4.t0 = _context4["catch"](1);
          console.log(_context4.t0);
          res.status(404).send();
          return _context4.abrupt("return");

        case 34:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[1, 29]]);
};

var deleteEmployee = function deleteEmployee(req, res, next) {
  var id, employee;
  return regeneratorRuntime.async(function deleteEmployee$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          id = parseInt(req.body.id); // console.log(id)

          _context5.prev = 1;
          _context5.next = 4;
          return regeneratorRuntime.awrap(_EmployeeModel["default"].findAll({
            where: {
              id: id,
              is_active: 1
            }
          }));

        case 4:
          employee = _context5.sent;

          if (!(employee.length > 0)) {
            _context5.next = 11;
            break;
          }

          _context5.next = 8;
          return regeneratorRuntime.awrap(_EmployeeModel["default"].update({
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

var importListEmployee = function importListEmployee(req, res, next) {
  var arrEmployee, listEmployeeError, index, nameEmployee, countPhone;
  return regeneratorRuntime.async(function importListEmployee$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          arrEmployee = JSON.parse(req.body.arrEmployee); // console.log(DateUtil.formatInputDate(arrEmployee[2].birthday),"arrEmployee")

          console.log(arrEmployee[0], "arrEmployee");
          listEmployeeError = [];
          index = 0;

        case 5:
          if (!(index < arrEmployee.length)) {
            _context6.next = 25;
            break;
          }

          if (arrEmployee[index].phone) {
            _context6.next = 10;
            break;
          }

          nameEmployee = arrEmployee[index].first_name + arrEmployee[index].last_name;
          listEmployeeError.push(nameEmployee);
          return _context6.abrupt("continue", 22);

        case 10:
          _context6.next = 12;
          return regeneratorRuntime.awrap(_EmployeeModel["default"].count({
            where: {
              phone: "0" + arrEmployee[index].phone.toString(),
              is_active: 1
            }
          }));

        case 12:
          countPhone = _context6.sent;

          if (!(countPhone > 0)) {
            _context6.next = 19;
            break;
          }

          _context6.next = 16;
          return regeneratorRuntime.awrap(_EmployeeModel["default"].update({
            first_name: arrEmployee[index].first_name,
            last_name: arrEmployee[index].last_name,
            password: (0, _md["default"])(arrEmployee[index].phone.toString()),
            address: arrEmployee[index].address,
            birthday: arrEmployee[index].birthday ? _DateUtil["default"].formatInputDate(arrEmployee[index].birthday) : "",
            gener: arrEmployee[index].sex == "nam" ? 1 : 0,
            email: arrEmployee[index].email,
            position: arrEmployee[index].position == "sếp" ? 1 : 0
          }, {
            where: {
              phone: "0" + arrEmployee[index].phone.toString()
            }
          }));

        case 16:
          console.log(1);
          _context6.next = 22;
          break;

        case 19:
          _context6.next = 21;
          return regeneratorRuntime.awrap(_EmployeeModel["default"].create({
            first_name: arrEmployee[index].first_name,
            last_name: arrEmployee[index].last_name,
            password: (0, _md["default"])(arrEmployee[index].phone.toString()),
            address: arrEmployee[index].address,
            birthday: arrEmployee[index].birthday ? _DateUtil["default"].formatInputDate(arrEmployee[index].birthday) : "",
            gener: arrEmployee[index].sex == "nam" ? 1 : 0,
            email: arrEmployee[index].email,
            phone: arrEmployee[index].phone ? "0" + arrEmployee[index].phone.toString() : "",
            position: arrEmployee[index].position == "sếp" ? 1 : 0
          }));

        case 21:
          console.log(2);

        case 22:
          index++;
          _context6.next = 5;
          break;

        case 25:
          res.send({
            result: 1,
            listEmployeeError: listEmployeeError
          });
          _context6.next = 33;
          break;

        case 28:
          _context6.prev = 28;
          _context6.t0 = _context6["catch"](0);
          console.log(_context6.t0);
          res.status(404).send();
          return _context6.abrupt("return");

        case 33:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 28]]);
};

var exportFileEmployee = function exportFileEmployee(req, res, next) {
  var listEmployees, index, workbook, worksheet;
  return regeneratorRuntime.async(function exportFileEmployee$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return regeneratorRuntime.awrap(_EmployeeModel["default"].findAll({
            is_active: 1
          }, {
            order: [["last_name", "ASC"]]
          }));

        case 3:
          listEmployees = _context7.sent;

          for (index = 0; index < listEmployees.length; index++) {
            listEmployees[index].stt = index;
            listEmployees[index].gener = listEmployees[index].gener == 1 ? "nam" : "nữ";
            listEmployees[index].position = listEmployees[index].position == 1 ? "sếp" : "nhân viên";
          }

          workbook = new _exceljs["default"].Workbook(); //creating workbook

          worksheet = workbook.addWorksheet("Employeee"); //creating worksheet
          //  WorkSheet Header

          worksheet.columns = [{
            header: "STT",
            key: "stt",
            width: 10
          }, {
            header: "Họ ",
            key: "first_name",
            width: 30
          }, {
            header: "Tên ",
            key: "last_name",
            width: 30
          }, {
            header: "Số điện thoại ",
            key: "phone",
            width: 20
          }, {
            header: "Ngày sinh",
            key: "birthday",
            width: 20
          }, {
            header: "Ngày sinh",
            key: "email",
            width: 30
          }, {
            header: "Giới tính",
            key: "gener",
            width: 15
          }, {
            header: "Vị trí",
            key: "position",
            width: 15
          }]; // Add Array Rows

          worksheet.addRows(listEmployees);
          res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
          res.setHeader("Content-Disposition", "attachment; filename=" + "listEmployee.xlsx");
          return _context7.abrupt("return", workbook.xlsx.write(res).then(function () {
            res.status(200).end();
          }));

        case 14:
          _context7.prev = 14;
          _context7.t0 = _context7["catch"](0);
          console.log(_context7.t0);
          res.status(404).send();
          return _context7.abrupt("return");

        case 19:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 14]]);
};

var _default = {
  getEmployee: getEmployee,
  searchEmployee: searchEmployee,
  addEmployee: addEmployee,
  saveEmployee: saveEmployee,
  deleteEmployee: deleteEmployee,
  importListEmployee: importListEmployee,
  exportFileEmployee: exportFileEmployee
};
exports["default"] = _default;