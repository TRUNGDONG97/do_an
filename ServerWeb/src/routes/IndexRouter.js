import express from "express";
import Other from "../api/WebApi/Other";
import AdminController from "../controllers/AdminController";
import EmployeeController from "../controllers/EmployeeController";
import MacAddressController from "../controllers/MacAddressController";

const router = express.Router();

router.get("/", function (req, res, next) {
  res.redirect("admin/login");
  // res.render('IndexView');
});
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

router.get("/getCountMac",MacAddressController.getCountMac)
module.exports = router;
