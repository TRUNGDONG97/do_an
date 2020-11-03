import express from 'express'
import EmployeeController from '../controllers/EmployeeController'
import HomeController from '../controllers/HomeController'
const router = express.Router();

router.get('/home', HomeController.home);
router.get('/employee',EmployeeController.getEmployee)
module.exports = router;