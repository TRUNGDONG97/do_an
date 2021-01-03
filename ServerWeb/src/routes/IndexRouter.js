import express from "express";
import Other from "../api/WebApi/Other";
import AdminController from "../controllers/AdminController";
import EmployeeController from "../controllers/EmployeeController";
import MacAddressController from "../controllers/MacAddressController";
import TimeKeepingMonthController from "../controllers/TimeKeepingMonthController";
import ConfigTimeController from '../controllers/ConfigTimeController';
import TimekeepingDayController from "../controllers/TimekeepingDayController";
const router = express.Router();
router.post("/user/changePass", Other.changePass);
router.get("/getCountEmployee", Other.getCountEmployee);
router.post("/searchEmployee", EmployeeController.searchEmployee);
router.post("/addEmployee", EmployeeController.addEmployee);
router.post("/saveEmployee", EmployeeController.saveEmployee);
router.post("/deleteEmployee", EmployeeController.deleteEmployee);
router.post("/importListEmployee", EmployeeController.importListEmployee);
router.get("/exportFileEmployee", EmployeeController.exportFileEmployee);

router.post("/searchAdmin", AdminController.searchAdmin);
router.post("/addAdmin", AdminController.addAdmin);
router.post("/deleteAdmin", AdminController.deleteAdmin);
router.get("/getCountAdmin", AdminController.getCountAdmin);
router.post("/saveAdmin", AdminController.saveAdmin);

router.get("/getCountMac", MacAddressController.getCountMac)
router.post("/getMacAddress", MacAddressController.getListMacAddress);
router.post("/addMacAddress",MacAddressController.addMacAddress);
router.post("/deleteMac",MacAddressController.deleteMac);
router.post("/editMacAddress",MacAddressController.editMacAddress)
router.get("/getMacOnServer",MacAddressController.getMacOnServer)

router.post("/seacherListTimekeeping",TimeKeepingMonthController.seacherListTimekeeping)
router.post("/seacherDetailTimekeeping",TimeKeepingMonthController.seacherDetailTimekeeping)
router.get("/exportFileTimekeeping", TimeKeepingMonthController.exportFileTimekeeping);


router.get("/getConfigTime",ConfigTimeController.getConfigTime)
router.post("/updateTimeConfig",ConfigTimeController.updateTimeConfig)

router.post('/seacherListTimekeepingDay',TimekeepingDayController.searchTimekeeping)
// seacherDetailTimekeeping
router.get("/", function (req, res, next) {
  res.redirect("admin/login");
  // res.render('IndexView');
});

module.exports = router;
