import express from 'express'
import Auth from '../api/AppApi/AuthApi'
import AppApi from '../api/AppApi/AppApi'
import TimekeepingApi from '../api/AppApi/TimekeepingApi';
import GetListTimekeeping from '../api/AppApi/GetListTimekeeping';
import ManagerTimekeeping from '../api/AppApi/ManagerTimekeeping';
const router = express.Router();
router.post('/login', Auth.login)
router.get('/logout', Auth.logout)
router.get('/app/api/notification', AppApi.notification)
router.get('/app/api/getUserInfo', AppApi.getUserInfo)
router.post('/app/api/changeUserInfo', AppApi.changeUserInfo)
router.post('/app/api/changePass', AppApi.changePass)
router.get('/app/api/getListTimekeeping', AppApi.getListTimekeeping)
router.post('/app/api/checkin', TimekeepingApi.checkin)
router.post('/app/api/checkout', TimekeepingApi.checkout)
router.post('/app/api/workoff', TimekeepingApi.workoff)
router.get('/app/api/getListTimekeepingDayEmployee', GetListTimekeeping.getListTimekeepingDayEmployee)
router.get('/app/api/getListTimekeepingMonthEmployee', GetListTimekeeping.getListTimekeepingMonthEmployee)
router.post('/app/api/confirm', ManagerTimekeeping.leaderComfirmTimekeeping)
router.post('/app/api/cancel', ManagerTimekeeping.leaderCancelTimekeeping)
// leaderCancelTimekeeping
module.exports = router;    