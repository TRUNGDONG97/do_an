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
    // console.log("countMacAddress",countMacAddress);
    if (countMacAddress.length < 1) {
      res.json({
        status: 0,
        code: 404,
        message: "Bạn không ở trong công ty",
        data: "",
      });
      return;
    }
    const getConfigTime = await ConfigtimeModel.findAll();

    //lay cham cong buoi sang
    const timekeepingMorning = await TimekeepingModel.findAll({
      where: {
        date_timekeeping: getCurrentDate(),
        is_active: 1,
        id_employee: employee[0].id,
        status: [0, 1],
        time_checkin: {
          [Op.between]: [
            getConfigTime[0].time_start_checkin_morning,
            getConfigTime[0].time_end_checkin_morning,
          ],
        },
      },
    });
    // console.log("getCurrentTime", getCurrentTime());
    // console.log(
    //   "checkTimeCheckinMorning(getCurrentTime())",
    //   checkTimeCheckinMorning(getCurrentTime())
    // );
    // console.log(
    //   "checkTimeCheckinAfternoon(getCurrentTime())",
    //   checkTimeCheckinAfternoon(getCurrentTime())
    // );
    //checkin buổi sáng
    if (checkTimeCheckinMorning(getCurrentTime())) {
      // check xin nghỉ buổi sáng hay ngày hôm đó chưa
      const getWorkOff = await TimekeepingModel.findAll({
        where: {
          date_timekeeping: getCurrentDate(),
          is_active: 1,
          id_employee: employee[0].id,
          status: [2, 4],
        },
      });
      if (getWorkOff.length > 0) {
        res.json({
          status: 0,
          code: 404,
          message: "Bạn đã xin nghỉ rồi nên không thể checkin",
          data: "",
        });
        return;
      }
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
      if (getCurrentTime() > getConfigTime[0].time_start_work_morning) {
        time_late = getCurrentTime() - getConfigTime[0].time_start_work_morning;
      }
      //tạo chấm công
      await TimekeepingModel.create({
        id_employee: employee[0].id,
        time_checkin: getCurrentTime(),
        time_late,
        id_mac_address: countMacAddress[0].id,
        date_timekeeping: getCurrentDate(),
      });
      // tạo thông báo ở database
      await NotificationModel.create({
        created_date: DateUtil.formatInputDate(new Date()),
        type: 1,
        id_employee: employee[0].id,
        content:
          "Chấm công ngày " +
          DateUtil.formatShortDate(new Date()) +
          " thành công",
      });

      //gửi thông báo về
      if (employee[0].device_id) {
        pushNotification(
          employee[0].device_id,
          "Chấm công ngày " +
            DateUtil.formatShortDate(new Date()) +
            " thành công",
          {}
        );
      }

      // trả vè dữ liêu
      res.json({
        status: 1,
        code: 200,
        message: "Checkin thành công",
        data: getDataTimekeeping(employee[0].id),
      });
      return;
    }
    //checkin buổi chiều
    if (checkTimeCheckinAfternoon(getCurrentTime())) {
      const getWorkOffApternoon = await TimekeepingModel.findAll({
        where: {
          date_timekeeping: getCurrentDate(),
          is_active: 1,
          id_employee: employee[0].id,
          status: [3, 4],
        },
      });
      if (getWorkOffApternoon.length > 0) {
        res.json({
          status: 0,
          code: 404,
          message: "Bạn đã xin nghỉ rồi nên không thể checkin",
          data: "",
        });
        return;
      }
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
          status: [0, 1],
          time_checkin: {
            [Op.between]: [
              getConfigTime[0].time_start_checkin_afternoon,
              getConfigTime[0].time_end_checkin_afternoon,
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
      if (getCurrentTime() > getConfigTime[0].time_start_work_afternoon) {
        time_late =
          getCurrentTime() - getConfigTime[0].time_start_work_afternoon;
      }
      await TimekeepingModel.create({
        id_employee: employee[0].id,
        date_timekeeping: getCurrentDate(),
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
        status: 1,
        code: 200,
        message: "Checkin thành công",
        data: getDataTimekeeping(employee[0].id),
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
// checkout
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
    const getConfigTime = await ConfigtimeModel.findAll();
    //  tìm kiếm xem buổi sáng checkin hay chưa

    const timekeepingMorning = await TimekeepingModel.findAll({
      where: {
        date_timekeeping: getCurrentDate(),
        is_active: 1,
        id_employee: employee[0].id,
        time_checkin: {
          [Op.between]: [
            getConfigTime[0].time_start_checkin_morning,
            getConfigTime[0].time_end_checkin_morning,
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
      // cập nhập đã checkout
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
        status: 1,
        code: 200,
        message: "Bạn checkout thành công .",
        data: getDataTimekeeping(employee[0].id),
      });
      return;
    }
    // tìm kiếm checkin buổi chiều
    const timekeepingAfternoon = await TimekeepingModel.findAll({
      where: {
        date_timekeeping: getCurrentDate(),
        is_active: 1,
        id_employee: employee[0].id,
        time_checkin: {
          [Op.between]: [
            getConfigTime[0].time_start_checkout_afternoon,
            getConfigTime[0].time_end_checkout_afternoon,
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
          status: 1,
          code: 200,
          message: "Bạn checkout thành công .",
          data: getDataTimekeeping(employee[0].id),
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
        status: 1,
        code: 200,
        message: "Bạn checkout thành công .",
        data: getDataTimekeeping(employee[0].id),
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
const workoff = async (req, res) => {
  try {
    const { token } = req.headers;
    const { status, date, note } = req.body;
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
    const getConfigTime = await ConfigtimeModel.findAll();
    // xin nghỉ buổi sáng ngày
    if (status == 2) {
      const timekeepingMorning = await TimekeepingModel.findAll({
        where: {
          date_timekeeping: date,
          is_active: 1,
          id_employee: employee[0].id,
          status: [0, 1, 2, 4],
          time_checkin: {
            [Op.between]: [
              getConfigTime[0].time_start_checkin_morning,
              getConfigTime[0].time_end_checkin_morning,
            ],
          },
        },
      });
      if (timekeepingMorning.length > 0) {
        res.json({
          status: 0,
          code: 404,
          message: "Bạn đã chấm công hoặc xin nghỉ rồi nên không thể xin nghỉ",
          data: "",
        });
        return;
      }
      await TimekeepingModel.create({
        id_employee: employee[0].id,
        date_timekeeping: date,
        time_checkin: 0,
        time_checkout: 0,
        time_late: 0,
        status: 2,
        workday: 0,
        note,
      });
      console.log(`Bạn xin nghỉ sáng ngày ${date}  thành công .`);
      res.json({
        status: 1,
        code: 200,
        message: `Bạn xin nghỉ sáng ngày ${date}  thành công .`,
        data: getDataTimekeeping(employee[0].id),
      });
      return;
    }
    // xin nghỉ buổi chiểu ngày
    if (status == 3) {
      const timekeepingAfternoon = await TimekeepingModel.findAll({
        where: {
          date_timekeeping: date,
          is_active: 1,
          id_employee: employee[0].id,
          status: [0, 1, 3, 4],
          time_checkin: {
            [Op.between]: [
              getConfigTime[0].time_start_checkin_afternoon,
              getConfigTime[0].time_end_checkin_afternoon,
            ],
          },
        },
      });
      if (timekeepingAfternoon.length > 0) {
        res.json({
          status: 0,
          code: 404,
          message: "Bạn đã chấm công hoặc đã xin nghỉ nên không thê xin nghỉ",
          data: "",
        });
        return;
      }
      await TimekeepingModel.create({
        id_employee: employee[0].id,
        date_timekeeping: date,
        time_checkin: 0,
        time_checkout: 0,
        time_late: 0,
        status: 3,
        workday: 0,
        note,
      });
      console.log(`Bạn xin nghỉ chiều ngày ${date}  thành công .`);
      res.json({
        status: 1,
        code: 200,
        message: `Bạn xin nghỉ chiều ngày ${date}  thành công .`,
        data: getDataTimekeeping(employee[0].id),
      });
      return;
    }
    // xin nghỉ cả ngày
    if (status == 3) {
      const timekeepingDay = await TimekeepingModel.findAll({
        where: {
          date_timekeeping: date,
          is_active: 1,
          id_employee: employee[0].id,
          status: [0, 1, 2, 3, 4],
        },
      });
      if (timekeepingDay.length > 0) {
        res.json({
          status: 0,
          code: 404,
          message: "Bạn đã chấm công hoặc đã xin nghỉ nên không thê xin nghỉ",
          data: "",
        });
        return;
      }
      await TimekeepingModel.create({
        id_employee: employee[0].id,
        date_timekeeping: date,
        time_checkin: 0,
        time_checkout: 0,
        time_late: 0,
        status: 4,
        workday: 0,
        note,
      });
      console.log(`Bạn xin nghỉ  ngày ${date}  thành công .`);
      res.json({
        status: 1,
        code: 200,
        message: `Bạn xin nghỉ  ngày ${date}  thành công .`,
        data: getDataTimekeeping(employee[0].id),
      });
      return;
    }
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

const getDataTimekeeping = async (id_employee) => {
  var date = new Date();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();
  var date1 = date.getDate();
  var startDate = year + "-" + month + "-" + "01";
  var endDate = year + "-" + month + "-" + date1;
  let TimeLateAndDay = await EmployeeModel.findAll({
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
  let listTimekeeping = await TimekeepingModel.findAll({
    where: {
      date_timekeeping: {
        [Op.between]: [startDate, endDate],
      },
      id_employee: id_employee,
    },
    order: [
      ["date_timekeeping", "DESC"],
      ["time_checkin", "DESC"],
    ],
  });
  var data = {
    timeLate: TimeLateAndDay[0].get("countTimeLate"),
    dayWork: TimeLateAndDay[0].get("countWorkday"),
    listTimekeeping,
  };
  return data;
};
export default {
  checkin,
  checkout,
  workoff,
};
