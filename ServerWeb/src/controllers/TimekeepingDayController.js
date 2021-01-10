import EmployeeModel from "../models/EmployeeModel";
import TimekeepingModel from "../models/TimekeepingModel";
import Constants from "../util/contant";
import { getArrayPages, PageCount } from "../util/funtions";
import url from "url";
import pug from "pug";
import sequelize, { Op, where } from "sequelize";
import DateUtil from "../util/DateUtil";
import {
  pushNotification,
} from "../util/funtions";
import NotificationModel from "../models/NotificationModel";
const getTimekeeping = async (req, res, next) => {
  res.render("TimekeepingDayView");
};
const searchTimekeeping = async (req, res) => {
  try {
    const { currentPage, employee_code, nameEmployee, date } = req.body;
    console.log("currentPage", currentPage);

    console.log("timekeeping", employee_code);
    const { rows, count } = await TimekeepingModel.findAndCountAll({
      include: [
        {
          model: EmployeeModel,
          where: {
            [Op.and]: [
              sequelize.where(
                sequelize.fn("lower", sequelize.col("last_name")),
                {
                  [Op.like]: "%" + nameEmployee + "%",
                }
              ),
              sequelize.where(
                sequelize.fn("lower", sequelize.col("employee_code")),
                {
                  [Op.like]: "%" + employee_code + "%",
                }
              ),
              {
                is_active: 1,
              },
            ],
          },
          order: [["last_name", "ASC"]],
        },
      ],
      where: {
        date_timekeeping: date,
        is_active: 1,
      },
      row: true,
      offset: Constants.PER_PAGE * (currentPage - 1),
      limit: Constants.PER_PAGE,
      // order: [["last_name", "ASC"]],
    });
    console.log("rows", count);
    var urlTable = `${process.cwd()}/src/table/TimekeepingDayTable.pug`;
    var htmlTable = await pug.renderFile(urlTable, {
      timekeeping: rows,
      STT: (currentPage - 1) * Constants.PER_PAGE,
      currentPage,
      pageCount: PageCount(count),
      pages: getArrayPages(req)(PageCount(count), currentPage),
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
};
const confirmTimekeeping = async (req, res) => {
  const { arrId } = req.body;
  const arrIdUpdate = JSON.parse(arrId);
  try {
    await TimekeepingModel.update(
      {
        type: 1,
      },
      {
        where: {
          id: arrIdUpdate,
        },
      }
    );
    const listEmployees = await TimekeepingModel.findAll({
      include: [
        {
          model: EmployeeModel,
        }
      ],
      where: {
        id:arrIdUpdate
      },
    });
    console.log('listEmployees',listEmployees);
    // for (let index = 0; index < listEmployees.length; index++) {
    //   const element = array[index];
      
    // }
    listEmployees.forEach(async element => {
      await NotificationModel.create({
        created_date: DateUtil.formatInputDate(new Date()),
        type: 1,
        id_employee: element.employee.id,
        content:"Chấm công ngày " + element.date_timekeeping+ " được xác nhận." ,
      });
      if(!!element.employee.device_id){
        console.log("device",element.employee.device_id);
        pushNotification(
          element.employee.device_id,"Chấm công ngày " + element.date_timekeeping+ " được xác nhận." ,
          {}
        );
      }
    });
    res.send({
      result: 3,
    });
  } catch (error) {
    console.log(error);
    res.status(404).send();
    return;
  }
};
const deleteTimekeeping = async (req, res) => {
  const { arrId } = req.body;
  const arrIdUpdate = JSON.parse(arrId);
  console.log(arrIdUpdate);
  try {
    await TimekeepingModel.update(
      {
        is_active: 0,
      },
      {
        where: {
          id: arrIdUpdate,
        },
      }
    );
    const listEmployees = await TimekeepingModel.findAll({
      include: [
        {
          model: EmployeeModel,
        }
      ],
      where: {
        id:arrIdUpdate
      },
    });
    console.log('listEmployees',listEmployees);
    // for (let index = 0; index < listEmployees.length; index++) {
    //   const element = array[index];
      
    // }
    listEmployees.forEach(async element => {
      await NotificationModel.create({
        created_date: DateUtil.formatInputDate(new Date()),
        type: 1,
        id_employee: element.employee.id,
        content:"Bạn đã bị hủy chấm công ngày " + element.date_timekeeping+ " ." ,
      });
      if(!!element.employee.device_id){
        console.log("device",element.employee.device_id);
        pushNotification(
          element.employee.device_id,"Bạn đã bị hủy chấm công ngày " + element.date_timekeeping+ " ." ,
          {}
        );
      }
    });
   
    res.send({
      result: 3,
    });
  } catch (error) {
    console.log(error);
    res.status(404).send();
    return;
  }
};
export default {
  getTimekeeping,
  searchTimekeeping,
  confirmTimekeeping,
  deleteTimekeeping,
};
