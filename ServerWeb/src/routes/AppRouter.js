import express from 'express'
import Auth from '../api/AppApi/AuthApi'
import AppApi from '../api/AppApi/AppApi'
const router = express.Router();
router.post('/login', Auth.login)
router.get('/logout', Auth.logout)
router.get('/app/api/notification', AppApi.notification)
// router.get('/student/getClass', Student.getClass)
router.get('/app/api/getUserInfo', AppApi.getUserInfo)
router.post('/app/api/changeUserInfo', AppApi.changeUserInfo)
router.post('/app/api/changePass', AppApi.changePass)
// router.get('/student/getListAbsentClass', Student.ListAbsentClass)
// router.get('/student/getDetaiClass', Student.DetailClass)
// router.get('/student/notification', Student.notification)
// router.post('/student/absent', Student.absentStudent)
// router.post('/student/uploadImage', Student.uploadImageAbsent)

// router.get('/teacher/getClass', Teacher.getClass)
// router.get('/teacher/getUserInfo', Teacher.getUserInfo)
// router.post('/teacher/changeUserInfo', Teacher.changeUserInfo)
// router.post('/teacher/changePass', Teacher.changePass)
// router.post('/teacher/createAbsent', Teacher.createAbsent)
// router.get('/teacher/getListAbsent', Teacher.getListAbsent)
// router.get('/teacher/getDetailAbsent', Teacher.getDetailAbsent)
// router.get('/getAbsentStudent', Teacher.getAbsentStudent)
// router.get('/teacher/getNotification', Teacher.getNotification)
// router.post('/teacher/cancelAbsent', Teacher.cancelAbsent)
// // router.post('/teacher/absentForStudent', Teacher.absentForStudent)
// router.get('/teacher/getDetailClass', Teacher.getDetailClass)
// router.post('/teacher/changeAbsentStudent', Teacher.changeAbsentStudent)

// router.post('/teacher/changePoint', Teacher.changePoint)

module.exports = router;