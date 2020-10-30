import { Op } from 'sequelize'
import sequelize from 'sequelize'
import md5 from 'md5'
import Constants from '../../util/contant'
import AdminModel from '../../models/AdminModel'
import EmployeeModel from '../../models/EmployeeModel'
// import ClassModel from '../../models/ClassModel'
// import SubjectModel from '../../models/SubjectModel'
// import TeacherModel from '../../models/TeacherModel'
import pug from 'pug'
// import { getArrayPages, PageCount } from '../../constants/Funtions'
import formidable from 'formidable'
import fs from 'fs'
import Employee from '../../models/EmployeeModel'
const uploadFile = async(req, res, next) => {
    var form = new formidable.IncomingForm();
    form.maxFieldsSize = 20 * 1024 * 1024; // file size 10mb
    form.uploadDir = "./public/upload/"
    form.parse(req);
    form.once('error', function(error) {
        console.log(error, 'eror')
        res.status(404).send()
        return;
    });
    form.on('file', function(field, file) {
        //rename the incoming file to the file's name
        fs.rename(file.path, form.uploadDir + file.name.replace(/ /g, "_"), () => {
            // console.log(file.path);
        });
    });
    // console.log()
    form.once('end', () => {
        res.send({
            result: 1,
        })
        return;
    });
}

const changePass = async(req, res, next) => {
    var { CurrentPassword, NewPassword } = req.body
    var token = req.signedCookies.token
    var password = md5(CurrentPassword)
    try {
        const users = await AdminModel.findAll({
            attribute: ["id", "password"],
            where: {
                token,
                password
            }
        })
        if (users.length == 0) {
            res.send({ result: 0 })
        } else {
            await AdminModel.update({
                password: md5(NewPassword)
            }, {
                where: {
                    id: users[0].id
                }
            })
            res.cookie('password', users[0].password, Constants.OPTION)
            res.send({ result: 1 })
        }
        return;
    } catch (error) {
        res.status(404).send();
        console.log(error)
        return;
    }
}
const getCountEmployee = async(req, res, next) => {
    try {
        const countEmployee = await EmployeeModel.count()
        res.send({
            countEmployee
        })
        return;
    } catch (error) {
        res.status(404).send();
        return;
    }
}
// const getCountTeacher = async(req, res, next) => {
//     try {
//         const countTeacher = await TeacherModel.count({
//             where:{
//                 is_active:1
//             }
//         })
//         res.send({
//             countTeacher
//         })
//         return;
//     } catch (error) {
//         res.status(404).send();
//         return;
//     }
// }
// const getCountClass = async(req, res, next) => {
//     try {
//         const countClass = await ClassModel.count({
//             where:{
//                 is_active:1
//             }
//         })
//         res.send({
//             countClass
//         })
//         return;
//     } catch (error) {
//         res.status(404).send
//         return;
//     }
// }
// const getCountSubject = async(req, res, next) => {
//     try {
//         const countSubject = await SubjectModel.count({
//             where:{
//                 is_active:1
//             }
//         })
//         res.send({
//             countSubject
//         })
//         return;
//     } catch (error) {
//         res.status(404).send
//         return;
//     }
// }
export default {
    changePass,
    getCountEmployee,
    // getCountTeacher,
    // getCountClass,
    // getCountSubject,
    // uploadFile
}