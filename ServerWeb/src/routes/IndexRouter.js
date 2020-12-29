import express from "express";
import Other from "../api/WebApi/Other";
import AdminController from "../controllers/AdminController";
import EmployeeController from "../controllers/EmployeeController";
import MacAddressController from "../controllers/MacAddressController";
import TimeKeepingController from "../controllers/TimeKeepingController";
import ConfigTimeController from '../controllers/ConfigTimeController';
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

router.post("/seacherListTimekeeping",TimeKeepingController.seacherListTimekeeping)
router.post("/seacherDetailTimekeeping",TimeKeepingController.seacherDetailTimekeeping)
router.get("/exportFileTimekeeping", TimeKeepingController.exportFileTimekeeping);


router.get("/getConfigTime",ConfigTimeController.getConfigTime)
router.post("/updateTimeConfig",ConfigTimeController.updateTimeConfig)
// seacherDetailTimekeeping
router.get("/", function (req, res, next) {
  res.redirect("admin/login");
  // res.render('IndexView');
});

module.exports = router;
