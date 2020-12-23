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
const checkin = async (req, res, next) => {

    try {
      const { token } = req.headers;
      const { address_mac } = req.body;
      console.log("req.body", address_mac);
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
      
      const countMacAddress = await MacAddressModel.findAll({
        where: {
          address_mac,
          is_active: 1,
        },
      });
      console.log("countMacAddress",countMacAddress);
      if (countMacAddress.length < 1) {
        res.json({
          status: 0,
          code: 404,
          message: "Bạn không ở trong công ty",
          data: "",
        });
        return
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
            code: 404,
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
            code: 404,
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
        code: 404,
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
          code: 404,
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
            code: 404,
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
            code: 404,
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
        code: 404,
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

    checkin,
    checkout,
  };
  