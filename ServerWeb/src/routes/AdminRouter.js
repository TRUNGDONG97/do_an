import express from 'express'
import AuthController from '../controllers/AuthController'
import HomeController from '../controllers/HomeController'
const router = express.Router();

router.get('/home', HomeController.home);
module.exports = router;