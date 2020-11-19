"use strict";

var _express = _interopRequireDefault(require("express"));

var _Other = _interopRequireDefault(require("../api/WebApi/Other"));

var _AdminController = _interopRequireDefault(require("../controllers/AdminController"));

var _EmployeeController = _interopRequireDefault(require("../controllers/EmployeeController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.get("/", function (req, res, next) {
  res.redirect("admin/login"); // res.render('IndexView');
});
router.post("/user/changePass", _Other["default"].changePass);
router.get("/getCountEmployee", _Other["default"].getCountEmployee);
router.post("/searchEmployee", _EmployeeController["default"].searchEmployee);
router.post("/addEmployee", _EmployeeController["default"].addEmployee);
router.post("/saveEmployee", _EmployeeController["default"].saveEmployee);
router.post("/deleteEmployee", _EmployeeController["default"].deleteEmployee);
router.post("/importListEmployee", _EmployeeController["default"].importListEmployee);
router.get("/exportFileEmployee", _EmployeeController["default"].exportFileEmployee);
router.post("/searchAdmin", _AdminController["default"].searchAdmin);
router.post("/addAdmin", _AdminController["default"].addAdmin);
router.post("/deleteAdmin", _AdminController["default"].deleteAdmin);
router.get("/getCountAdmin", _AdminController["default"].getCountAdmin);
module.exports = router;