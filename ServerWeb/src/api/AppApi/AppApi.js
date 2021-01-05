import NotificationModel from "../../models/NotificationModel";
import EmployeeModel from "../../models/EmployeeModel";
import md5 from "md5";
import sequelize, { Op } from "sequelize";
import TimekeepingModel from "../../models/TimekeepingModel";
import MacAddressModel from "../../models/MacAddressModel";
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
const notification = async (req, res, next) => {
  const { token } = req.headers;
  if (token == "") {
    res.json({
      status: 0,
      code: 404,
      message: "thất bại",
      data: "",
    });
    return;
  }
  try {
    const employee = await EmployeeModel.findAndCountAll({
      where: {
        token,
        is_active: 1,
      },
    });
    if (employee.count > 0) {
      const ListNoti = await NotificationModel.findAll({
        where: {
          id_employee: employee.rows[0].id,
        },
        order: [["created_date", "DESC"]],
      });
      res.json({
        status: 1,
        code: 200,
        message: "thành công",
        data: ListNoti,
      });
      return;
    }
    res.json({
      status: 0,
      code: 403,
      message: "Chưa đăng nhập",
      data: "",
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
const getUserInfo = async (req, res, next) => {
  const { token } = req.headers;
  if (token == "") {
    res.json({
      status: 0,
      code: 404,
      message: "thất bại",
      data: "",
    });
    return;
  }
  try {
    const employee = await EmployeeModel.findAndCountAll({
      where: {
        token,
        is_active: 1,
      },
    });
    if (employee.count > 0) {
      const data = employee.rows[0];
      // console.log(result[0].birthday.toString().split("-").reverse().join("/"))
      res.json({
        status: 1,
        code: 200,
        message: "thành công",
        data: {
          id: data.id,
          first_name: data.first_name,
          last_name: data.last_name,
          phone: data.phone,
          birthday: data.birthday.split("-").reverse().join("/"),
          address: data.address,
          email: data.email,
          device_id: data.device_id,
          token: data.token,
          sex: data.gener,
          employee_code: data.employee_code,
        },
      });
      return;
    }
    res.json({
      status: 0,
      code: 403,
      message: "Chưa đăng nhập",
      data: "",
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
const changeUserInfo = async (req, res, next) => {
  const { token } = req.headers;
  if (token == "") {
    res.json({
      status: 0,
      code: 404,
      message: "thất bại",
      data: "",
    });
    return;
  }
  const { phone, address, sex, birthday, email } = req.body;
  // console.log(phone)
  // console.log(address)
  // console.log(sex)
  // console.log(birthday)
  // console.log(password)
  // console.log(email)
  try {
    const count = await EmployeeModel.count({
      where: {
        token,
        is_active: 1,
      },
    });
    if (count > 0) {
      const updateStu = await EmployeeModel.update(
        {
          phone,
          address,
          gener: sex,
          birthday: birthday.split("/").reverse().join("-"),
          // password: md5(password),
          email,
        },
        {
          where: {
            token,
          },
        }
      );
      const result = await EmployeeModel.findAll({
        where: {
          token,
          is_active: 1,
        },
      });
      // console.log(result[0].birthday.split("-").reverse().join("/"))
      var data = result[0];
      // data.birthday= data.birthday.split("-").reverse().join("/")
      // console.log(data)
      res.json({
        status: 1,
        code: 200,
        message: "Thay đổi thông tin thành công",
        data: {
          id: data.id,
          first_name: data.first_name,
          last_name: data.last_name,
          phone: data.phone,
          birthday: data.birthday.split("-").reverse().join("/"),
          address: data.address,
          email: data.email,
          device_id: data.device_id,
          token: data.token,
          sex: data.gener,
          employee_code: data.employee_code,
        },
      });
      return;
    }
    res.json({
      status: 0,
      code: 403,
      message: "Chưa đăng nhập",
      data: "",
    });
    return;
  } catch (error) {
    // console.log(error)
    res.json({
      status: 0,
      code: 404,
      message: "Đã có lỗi xảy ra",
      data: "",
    });
    return;
  }
};
const changePass = async (req, res, next) => {
  const { token } = req.headers;
  if (token == "") {
    res.json({
      status: 0,
      code: 404,
      message: "thất bại",
      data: "",
    });
    return;
  }
  const { oldPassword, newPassword } = req.body;
  try {
    const employee = await EmployeeModel.findAndCountAll({
      where: {
        token,
        is_active: 1,
      },
    });
    if (employee.count > 0) {
      if (employee.rows[0].password.trim() != md5(oldPassword.trim())) {
        res.json({
          status: 0,
          code: 404,
          message: "Mật khẩu cũ không đúng",
          data: {},
        });
        return;
      }
      const updatePass = await EmployeeModel.update(
        {
          password: md5(newPassword),
        },
        {
          where: {
            token,
          },
        }
      );
      res.json({
        status: 1,
        code: 200,
        message: "Đổi mật khẩu thành công",
        data: {},
      });
      return;
    }
    res.json({
      status: 0,
      code: 403,
      message: "Chưa đăng nhập",
      data: "",
    });
    return;
  } catch (error) {
    console.log(error,"dsđs");
    res.json({
      status: 0,
      code: 404,
      message: "Đã có lỗi xảy ra",
      data: "",
    });
    return;
  }
};
const getListTimekeeping = async (req, res, next) => {
  const { token } = req.headers;
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;
  console.log("startDate", startDate);
  console.log("endDate", endDate);
  if (token == "") {
    res.json({
      status: 0,
      code: 404,
      message: "thất bại",
      data: "",
    });
    return;
  }
  try {
    const employee = await EmployeeModel.findAndCountAll({
      where: {
        token,
        is_active: 1,
      },
    });
    if (employee.count < 1) {
      res.json({
        status: 0,
        code: 403,
        message: "Chưa đăng nhập",
        data: "",
      });
      return;
    }
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
            id_employee: employee.rows[0].id,
          },
          required: false,
          // order: [["date_timekeeping", "DESC"],["time_checkin","DESC"]],
        },
      ],
      where: {
        is_active: 1,
        id: employee.rows[0].id,
      },
      row: true,
      group: ["employee.id"],

    });
    const listTimekeeping = await TimekeepingModel.findAll({
      where: {
        date_timekeeping: {
          [Op.between]: [startDate, endDate],
        },
        id_employee: employee.rows[0].id,
      },
      order: [["date_timekeeping", "DESC"], ["time_checkin", "DESC"]],
    })
    res.json({
      status: 1,
      code: 200,
      message: "Thành công",
      data: {
        timeLate: TimeLateAndDay[0].get('countTimeLate'),
        dayWork: TimeLateAndDay[0].get('countWorkday'),
        listTimekeeping
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
  notification,
  getUserInfo,
  changeUserInfo,
  changePass,
  getListTimekeeping,

};
