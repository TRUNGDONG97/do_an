import express from 'express'
import EmployeeController from '../controllers/EmployeeController'
import HomeController from '../controllers/HomeController'
import AdminController from '../controllers/AdminController'
const router = express.Router();

router.get('/home', HomeController.home);
router.get('/employee',EmployeeController.getEmployee)
router.get('/admin',AdminController.getAdmin)
module.exports = router;