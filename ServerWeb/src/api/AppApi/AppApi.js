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
    const listTimekeeping=await TimekeepingModel.findAll({
      where:{
        date_timekeeping: {
          [Op.between]: [startDate, endDate],
        },
        id_employee: employee.rows[0].id,
      },
      order: [["date_timekeeping", "DESC"],["time_checkin","DESC"]],
    })
    console.log("listTimekeepingOfEmployee",TimeLateAndDay[0].get('countTimeLate'));
    res.json({
      status: 1,
      code: 200,
      message: "Thành công",
      data: {
        timeLate:TimeLateAndDay[0].get('countTimeLate'),
        dayWork:TimeLateAndDay[0].get('countWorkday'),
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
const checkin = async (req, res, next) => {
  const { token } = req.headers;
  const { address_mac } = req.body;
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
    const employee = await EmployeeModel.findAll({
      where: {
        token,
        is_active: 1,
      },
    });
    if (employee.length < 1) {
      res.json({
        status: 0,
        code: 403,
        message: "Chưa đăng nhập",
        data: "",
      });
      return;
    }
    const countMacAddress = await MacAddressModel.findAll({
      where: {
        address_mac,
        is_active: 1,
      },
    });
    if (countMacAddress.length < 1) {
      res.json({
        status: 0,
        code: 403,
        message: "Bạn không ở trong công ty",
        data: "",
      });
    }
    //check xin nghỉ
    
    const timekeepingMorning = await TimekeepingModel.findAll({
      where: {
        date_timekeeping: getCurrentDate(),
        is_active: 1,
        id_employee: employee[0].id,
        time_checkin: {
          [Op.between]: [
            Contant.TIMEKEEPING.TIME_START_CHECKIN_MORNING,
            Contant.TIMEKEEPING.TIME_END_CHECKIN_MORNING,
          ],
        },
      },
    });
    //checkin buổi sáng
    if (checkTimeCheckinMorning(getCurrentTime())) {
      //check đã chấm công chưa
      if (timekeepingMorning.length > 0) {
        res.json({
          status: 0,
          code: 404,
          message: "Bạn đã checkin rồi",
          data: "",
        });
        return;
      }
      // tính thời gian đi muộn
      var time_late = 0;
      if (getCurrentTime() > Contant.TIME_WORKING.TIME_START_WORKING_MORNING) {
        time_late =
          getCurrentTime() - Contant.TIME_WORKING.TIME_START_WORKING_MORNING;
      }
      //tạo chấm công
      await TimekeepingModel.create({
        id_employee: employee[0].id,
        time_checkin: getCurrentTime(),
        time_late,
        id_mac_address: countMacAddress[0].id,
      });
      // gửi thông báo về
      await NotificationModel.create({
        created_date: DateUtil.formatInputDate(new Date()),
        type: 1,
        id_employee: employee[0].id,
        content:
          "Chấm công ngày " +
          DateUtil.formatShortDate(new Date()) +
          " thành công",
      });
      if (employee[0].device_id) {
        pushNotification(
          employee[0].device_id,
          "Chấm công ngày " +
            DateUtil.formatShortDate(new Date()) +
            " thành công",
          {}
        );
      }

      res.json({
        status: 0,
        code: 200,
        message: "Checkin thành công",
        data: "",
      });
      return;
    }
    //checkin buổi chiều
    if (checkTimeCheckinAfternoon(getCurrentTime())) {
      if (timekeepingMorning.length > 0 && timekeepingMorning[0].status == 0) {
        res.json({
          status: 0,
          code: 403,
          message:
            "Bạn chưa checkout buổi sáng nên không thể checkin buổi chiều.",
          data: "",
        });
        return;
      }
      const timekeepingAfternoon = await TimekeepingModel.findAll({
        where: {
          date_timekeeping: getCurrentDate(),
          is_active: 1,
          id_employee: employee[0].id,
          time_checkin: {
            [Op.between]: [
              Contant.TIMEKEEPING.TIME_START_CHECKIN_AFTERNOON,
              Contant.TIMEKEEPING.TIME_END_CHECKIN_AFTERNOON,
            ],
          },
        },
      });
      if (timekeepingAfternoon.length > 0) {
        res.json({
          status: 0,
          code: 403,
          message: "Bạn đã checkin rồi",
          data: "",
        });
        return;
      }
      var time_late = 0;
      if (
        getCurrentTime() > Contant.TIME_WORKING.TIME_START_WORKING_AFTERNOON
      ) {
        time_late =
          getCurrentTime() - Contant.TIME_WORKING.TIME_START_WORKING_AFTERNOON;
      }
      await TimekeepingModel.create({
        id_employee: employee[0].id,
        time_checkin: getCurrentTime(),
        time_late,
        id_mac_address: countMacAddress[0].id,
      });
      await NotificationModel.create({
        created_date: DateUtil.formatInputDate(new Date()),
        type: 1,
        id_employee: employee[0].id,
        content:
          "Chấm công ngày " +
          DateUtil.formatShortDate(new Date()) +
          " thành công",
      });
      if (employee[0].device_id) {
        pushNotification(
          employee[0].device_id,
          "Chấm công ngày " +
            DateUtil.formatShortDate(new Date()) +
            " thành công",
          {}
        );
      }
      res.json({
        status: 0,
        code: 200,
        message: "Checkin thành công",
        data: "",
      });
      return;
    }
    res.json({
      status: 0,
      code: 403,
      message: "Hiện tại bạn không thể checkin.",
      data: "",
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

const checkout = async (req, res, next) => {
  const { token } = req.headers;
  const { address_mac } = req.body;
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
    const employee = await EmployeeModel.findAll({
      where: {
        token,
        is_active: 1,
      },
    });
    if (employee.length < 1) {
      res.json({
        status: 0,
        code: 403,
        message: "Chưa đăng nhập",
        data: "",
      });
      return;
    }
    const countMacAddress = await MacAddressModel.findAll({
      where: {
        address_mac,
        is_active: 1,
      },
    });
    if (countMacAddress.length < 1) {
      res.json({
        status: 0,
        code: 403,
        message: "Bạn không ở trong công ty",
        data: "",
      });
    }
  
    const timekeepingMorning = await TimekeepingModel.findAll({
      where: {
        date_timekeeping: getCurrentDate(),
        is_active: 1,
        id_employee: employee[0].id,
        time_checkin: {
          [Op.between]: [
            Contant.TIMEKEEPING.TIME_START_CHECKIN_MORNING,
            Contant.TIMEKEEPING.TIME_END_CHECKIN_MORNING,
          ],
        },
      },
    });
    if (checkTimeCheckoutMorning(getCurrentTime())) {
      if (timekeepingMorning.length < 1) {
        res.json({
          status: 0,
          code: 403,
          message: "Bạn chưa checkin .",
          data: "",
        });
        return;
      }
      await TimekeepingModel.update(
        {
          time_checkout: getCurrentTime(),
          workday: 0.5,
          status: 1,
        },
        {
          where: {
            id: timekeepingMorning[0].id,
          },
        }
      );
      await NotificationModel.create({
        created_date: DateUtil.formatInputDate(new Date()),
        type: 1,
        id_employee: employee[0].id,
        content:
          "Checkout sáng ngày " +
          DateUtil.formatShortDate(new Date()) +
          " thành công",
      });
      if (employee[0].device_id) {
        pushNotification(
          employee[0].device_id,
          "Checkout sáng ngày " +
            DateUtil.formatShortDate(new Date()) +
            " thành công",
          {}
        );
      }
      res.json({
        status: 0,
        code: 200,
        message: "Bạn checkout thành công .",
        data: "",
      });
      return;
    }
    const timekeepingAfternoon = await TimekeepingModel.findAll({
      where: {
        date_timekeeping: getCurrentDate(),
        is_active: 1,
        id_employee: employee[0].id,
        time_checkin: {
          [Op.between]: [
            Contant.TIMEKEEPING.TIME_START_CHECKIN_AFTERNOON,
            Contant.TIMEKEEPING.TIME_END_CHECKIN_AFTERNOON,
          ],
        },
      },
    });
    if (checkTimeCheckoutAfternoon(getCurrentTime())) {
      if (
        (timekeepingMorning.length < 1 ||
          (timekeepingMorning.length > 1 &&
            timekeepingMorning[0].status == 1)) &&
        timekeepingAfternoon.length < 1
      ) {
        res.json({
          status: 0,
          code: 403,
          message: "Bạn chưa checkin",
          data: "",
        });
        return;
      }
      if (timekeepingMorning.length > 0 && timekeepingMorning[0].status == 0) {
        await TimekeepingModel.update(
          {
            time_checkout: getCurrentTime(),
            workday: 1,
            status: 1,
          },
          {
            where: {
              id: timekeepingMorning[0].id,
            },
          }
        );
        await NotificationModel.create({
          created_date: DateUtil.formatInputDate(new Date()),
          type: 1,
          id_employee: employee[0].id,
          content:
            "Checkout ngày " +
            DateUtil.formatShortDate(new Date()) +
            " thành công",
        });
        if (employee[0].device_id) {
          pushNotification(
            employee[0].device_id,
            "Checkout ngày " +
              DateUtil.formatShortDate(new Date()) +
              " thành công",
            {}
          );
        }
        res.json({
          status: 0,
          code: 200,
          message: "Bạn checkout thành công .",
          data: "",
        });
        return;
      }
      if (timekeepingAfternoon.length > 0) {
        await TimekeepingModel.update(
          {
            time_checkout: getCurrentTime(),
            workday: 0.5,
            status: 1,
          },
          {
            where: {
              id: timekeepingAfternoon[0].id,
            },
          }
        );
      }
      await NotificationModel.create({
        created_date: DateUtil.formatInputDate(new Date()),
        type: 1,
        id_employee: employee[0].id,
        content:
          "Checkout chiều ngày " +
          DateUtil.formatShortDate(new Date()) +
          " thành công",
      });
      if (employee[0].device_id) {
        pushNotification(
          employee[0].device_id,
          "Checkout chiều ngày " +
            DateUtil.formatShortDate(new Date()) +
            " thành công",
          {}
        );
      }
      res.json({
        status: 0,
        code: 200,
        message: "Bạn checkout thành công .",
        data: "",
      });
      return;
    }
    res.json({
      status: 0,
      code: 403,
      message: "bạn không thể checkout lúc này",
      data: "",
    });
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

export default {
  notification,
  getUserInfo,
  changeUserInfo,
  changePass,
  getListTimekeeping,
  checkin,
  checkout,
};
