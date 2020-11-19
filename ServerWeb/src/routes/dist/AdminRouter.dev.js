"use strict";

var _express = _interopRequireDefault(require("express"));

var _EmployeeController = _interopRequireDefault(require("../controllers/EmployeeController"));

var _HomeController = _interopRequireDefault(require("../controllers/HomeController"));

var _AdminController = _interopRequireDefault(require("../controllers/AdminController"));

var _AdminModel = _interopRequireDefault(require("../models/AdminModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.get('/home', _HomeController["default"].home);
router.get('/employee', _EmployeeController["default"].getEmployee);
router.get('/admin', _AdminController["default"].getAdmin);
module.exports = router;