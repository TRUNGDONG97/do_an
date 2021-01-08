import NotificationModel from "../../models/NotificationModel";
import EmployeeModel from "../../models/EmployeeModel";
import md5 from "md5";
import sequelize, { Op } from "sequelize";
import TimekeepingModel from "../../models/TimekeepingModel";
import MacAddressModel from "../../models/MacAddressModel";
import ConfigtimeModel from "../../models/ConfigtimeModel";
import {
  checkTimeCheckinAfternoon,
  checkTimeCheckinMorning,
  checkTimeCheckoutAfternoon,
  checkTimeCheckoutMorning,
  getCurrentTime,
  getCurrentDate,
  pushNotification,
} from "../../util/funtions";
import Contant from "../../util/contant";
import DateUtil from "../../util/DateUtil";
const getListTimekeepingDayEmployee = async (req, res) => {
  try {
    const { token } = req.headers;
    const { dateGet } = req.query;
    console.log("dateGet", dateGet);
    if (token == "") {
      res.json({
        status: 0,
        code: 404,
        message: "thất bại",
        data: "",
      });
      return;
    }

    const employee = await EmployeeModel.findAll({
      where: {
        token,
        is_active: 1,
      },
    });
    if (employee.length < 1) {
      res.json({
        status: 0,
        code: 404,
        message: "Chưa đăng nhập",
        data: "",
      });
      return;
    }
    const listEmployees = await TimekeepingModel.findAll({
      include: [
        {
          model: EmployeeModel,
          where: {
            is_active: 1,
            department: employee[0].department,
            id: { [Op.not]: employee[0].id },
          },
          order: [["last_name", "ASC"]],
        },
      ],
      where: {
        date_timekeeping: dateGet,
      },
      row: true,
    });
    res.json({
      status: 1,
      code: 200,
      message: "Thành công",
      data: {
        listEmployees,
        department:
          employee[0].department == 1
            ? "Nhân sự"
            : employee[0].department == 2
            ? "Lập trình"
            : "Kinh doanh",
      },
    });
    return;
  } catch (error) {
    console.log("error", error);
    res.json({
      status: 0,
      code: 404,
      message: "Đã có lỗi xảy ra",
      data: "",
    });
    return;
  }
};
const getListTimekeepingMonthEmployee = async (req, res) => {
  try {
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    const id_employee = req.query.id_employee;
    console.log("startDate", startDate);
    console.log("endDate", endDate);

    const TimeLateAndDay = await EmployeeModel.findAll({
      attributes: [
        [
          sequelize.fn("sum", sequelize.col("timekeepings.workday")),
          "countWorkday",
        ],
        [
          sequelize.fn("sum", sequelize.col("timekeepings.time_late")),
          "countTimeLate",
        ],
      ],
      include: [
        {
          model: TimekeepingModel,
          where: {
            date_timekeeping: {
              [Op.between]: [startDate, endDate],
            },
            id_employee,
            is_active:1
          },
          required: false,
          // order: [["date_timekeeping", "DESC"],["time_checkin","DESC"]],
        },
      ],
      where: {
        is_active: 1,
        id: id_employee,
      },
      row: true,
      group: ["employee.id"],
    });
    const listTimekeeping = await TimekeepingModel.findAll({
      where: {
        date_timekeeping: {
          [Op.between]: [startDate, endDate],
        },
        id_employee,
        is_active:1
      },
      order: [
        ["date_timekeeping", "DESC"],
        ["time_checkin", "DESC"],
      ],
    });
    res.json({
      status: 1,
      code: 200,
      message: "Thành công",
      data: {
        timeLate: TimeLateAndDay[0].get("countTimeLate"),
        dayWork: TimeLateAndDay[0].get("countWorkday"),
        listTimekeeping,
      },
    });
    return;
  } catch (error) {
    console.log(error);
    res.json({
      status: 0,
      code: 404,
      message: "Đã có lỗi xảy ra",
      data: "",
    });
    return;
  }
};
export default {
  getListTimekeepingDayEmployee,
  getListTimekeepingMonthEmployee,
};
