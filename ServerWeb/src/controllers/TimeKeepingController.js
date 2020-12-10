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
const seacheListTimekeeping = async (req, res, next) => {
    try {
        const { currentPage, employee_code, nameEmployee } = req.body;
        // console.log("phoneEmployee", phoneEmployee);
        // console.log("nameEmployee", nameEmployee);
        const { count, rows } = await EmployeeModel.findAndCountAll({
            // attributes: ['id', 'first_name', 'last_name', 'employee_code'],
                // [sequelize.fn('sum', sequelize.col('timekeepings.workday')), 'countWorkday'],
                // [sequelize.fn('sum', sequelize.col('timekeepings.time_late')), 'countTimeLate']],
            include: [{
                model: TimekeepingModel,
                // attributes: [],
                // where: {
                //     date_timekeeping: {
                //         $between: ['2020-12-01', '2020-12-31']
                //     }
                // },
                // required: false
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
            // group: ['employee.id'],
            offset: Constants.PER_PAGE * (currentPage - 1),
            limit: Constants.PER_PAGE,
            order: [["last_name", "ASC"]],
        });
        console.log("rows",rows[0].timekeepings);
        const pageCount = PageCount(count);

        var urlTable = `${process.cwd()}/src/table/TimekeepingTable.pug`;
        var htmlTable = await pug.renderFile(urlTable, {
            employees: rows,
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
export default {
    getTimekeeping,
    seacheListTimekeeping
}