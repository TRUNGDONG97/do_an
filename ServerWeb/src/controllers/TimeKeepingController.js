import EmployeeModel from "../models/EmployeeModel";
import TimekeepingModel from "../models/TimekeepingModel";
import Constants from "../util/contant";
import { getArrayPages, PageCount } from "../util/funtions";
import url from "url";
import pug from "pug";
import sequelize, { Op } from "sequelize";
import md5 from "md5";
import DateUtil from "../util/DateUtil";
import excel from "exceljs";

const getTimekeeping = async (req, res, next) => {
    res.render('TimekeepingView');
}
const seacherListTimekeeping = async (req, res, next) => {
    try {
        const { currentPage, employee_code, nameEmployee, startDate, endDate } = req.body;
        console.log("currentPage", currentPage);
        console.log("startDate", startDate);
        console.log("endDate", endDate);
        // console.log("timekeeping", timekeepings[0].employee.id)
        const employees = await EmployeeModel.findAll({
            attributes: ['id', 'first_name', 'last_name', 'employee_code', 'department', 'position',
                [sequelize.fn('sum', sequelize.col('timekeepings.workday')), 'countWorkday'],
                [sequelize.fn('sum', sequelize.col('timekeepings.time_late')), 'countTimeLate']],
            include: [{
                model: TimekeepingModel,
                attributes: [],
                where: {
                    date_timekeeping: {
                        [Op.between]: [startDate, endDate]
                    }
                },
                required: false,
            }],
            where: {
                [Op.and]: [
                    sequelize.where(sequelize.fn("lower", sequelize.col("last_name")), {
                        [Op.like]: "%" + nameEmployee + "%",
                    }),
                    sequelize.where(sequelize.fn("lower", sequelize.col("employee_code")), {
                        [Op.like]: "%" + employee_code + "%",
                    }),
                    {
                        is_active: 1,
                    },
                ],
            },
            row: true,
            group: ['employee.id'],
            offset: Constants.PER_PAGE * (currentPage - 1),
            // limit: Constants.PER_PAGE,
            order: [["last_name", "ASC"]],
        });
        const count = employees.length

        // console.log("rows", employees[7]);
        const pageCount = PageCount(count);
        // console.log("pageCount", pageCount);

        var urlTable = `${process.cwd()}/src/table/TimekeepingTable.pug`;
        var htmlTable = await pug.renderFile(urlTable, {
            employees: employees,
            STT: (currentPage - 1) * Constants.PER_PAGE,
            currentPage,
            pageCount: pageCount,
            pages: getArrayPages(req)(pageCount, currentPage),
        });
        res.send({
            htmlTable,
        });
        return;
    } catch (error) {
        console.log(error);
        res.status(404).send();
        return;
    }
}
const detailTimekeeping = async (req, res, next) => {
    const employee_code = req.query.employee_code
    console.log("employee_codeddd", employee_code);
    if (!employee_code) {
        res.redirect('/admin/timekeeping')
        return;
    }
    try {
        const employees = await EmployeeModel.findAll({
            where: {
                employee_code,
                is_active: 1
            }
        })
        if (employees.length < 1) {
            res.redirect('/admin/timekeeping')
            return;
        }
        res.render('TimekeepingDetailView', {
            employee: employees[0]
        });
    } catch (error) {
        res.render('ErrorView', {
            error
        })
        return;
    }

}
const seacherDetailTimekeeping = async (req, res, next) => {
    try {
        const { currentPage, idEmployee, startDate, endDate } = req.body;
        console.log("idEmployee", idEmployee);
        console.log("startDate", startDate);
        console.log("endDate", endDate);
        const { count, rows } = await TimekeepingModel.findAndCountAll({
            where: {
                date_timekeeping: {
                    [Op.between]: [startDate, endDate],
                },
                id_employee: idEmployee,
                is_active: 1
            },
            offset: Constants.PER_PAGE * (currentPage - 1),
            limit: Constants.PER_PAGE,
            order: [["date_timekeeping", "ASC"]],
        })


        console.log("rows", rows);
        const pageCount = PageCount(count);
        // console.log("pageCount", pageCount);

        var urlTable = `${process.cwd()}/src/table/DetailTimekeepingTable.pug`;
        var htmlTable = await pug.renderFile(urlTable, {
            listTimekeeping: rows,
            STT: (currentPage - 1) * Constants.PER_PAGE,
            currentPage,
            pageCount: pageCount,
            pages: getArrayPages(req)(pageCount, currentPage),
        });
        res.send({
            htmlTable,
        });
        return;
    } catch (error) {
        console.log(error);
        res.status(404).send();
        return;
    }
}
const exportFileTimekeeping = async (req, res, next) => {
    try {
        const { idEmployee, startDate, endDate } = req.query
        console.log("id_employye",idEmployee);
        const { count, rows } = await TimekeepingModel.findAndCountAll({
            where: {
                date_timekeeping: {
                    [Op.between]: [startDate, endDate],
                },
                id_employee:idEmployee,
                is_active: 1
            },
            order: [["date_timekeeping", "ASC"]],
        })
        // for (let index = 0; index < rows.length; index++) {
        //     listEmployees[index].stt = index;
        //     listEmployees[index].gener =
        //         listEmployees[index].gener == 1 ? "Nam" : "Nữ";
        // }
        let workbook = new excel.Workbook(); //creating workbook
        let worksheet = workbook.addWorksheet("Timekeeping"); //creating worksheet

        //  WorkSheet Header
        worksheet.columns = [
            { header: "STT", key: "stt", width: 10 },
            { header: "Ngày chấm công ", key: "date_timekeeping", width: 30 },
            { header: "Thời gian checkin ", key: "time_checkin", width: 40 },
            { header: "thời gian checkout ", key: "time_checkout", width: 40 },
            { header: "thời gian đi muộn", key: "time_late", width: 30 },
            { header: "Ngày công", key: "workday", width: 20 },
          
        ];

        // Add Array Rows
        worksheet.addRows(rows);

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
            "Content-Disposition",
            "attachment; filename=" + "listTimekeeping.xlsx"
        );
        return workbook.xlsx.write(res).then(function () {
            res.status(200).end();
        });
    } catch (error) {
        console.log(error);
        res.status(404).send();
        return;
    }
}
export default {
    getTimekeeping,
    seacherListTimekeeping,
    detailTimekeeping,
    seacherDetailTimekeeping,
    exportFileTimekeeping
}