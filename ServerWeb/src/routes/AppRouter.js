import express from 'express'
import Auth from '../api/AppApi/AuthApi'
import AppApi from '../api/AppApi/AppApi'
const router = express.Router();
router.post('/login', Auth.login)
router.get('/logout', Auth.logout)
router.get('/app/api/notification', AppApi.notification)
router.get('/app/api/getUserInfo', AppApi.getUserInfo)
router.post('/app/api/changeUserInfo', AppApi.changeUserInfo)
router.post('/app/api/changePass', AppApi.changePass)
router.get('/app/api/getListTimekeeping', AppApi.getListTimekeeping)
router.post('/app/api/checkin', AppApi.checkin)
router.post('/app/api/checkout', AppApi.checkout)
module.exports = router;    