import NotificationModel from "../../models/NotificationModel";
import EmployeeModel from "../../models/EmployeeModel";
import md5 from "md5";
import sequelize, { Op } from "sequelize";
import TimekeepingModel from "../../models/TimekeepingModel";
import MacAddressModel from "../../models/MacAddressModel";
import ConfigtimeModel from "../../models/ConfigtimeModel";

const leaderComfirmTimekeeping = async (req, res) => {
  const { token } = req.headers;
  const { listId, date } = req.body;
  try {
    if (token == "") {
      res.json({
        status: 0,
        code: 404,
        message: "thất bại",
        data: "",
      });
      return;
    }
    if (listId.length < 1) {
      res.json({
        status: 0,
        code: 404,
        message: "Bạn chưa gửi chấm công nào",
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
    await TimekeepingModel.update(
      {
        type: 1,
      },
      {
        where: {
          id: listId,
        },
      }
    );
    res.json({
      status: 1,
      code: 200,
      message: "Thành công",
      data: {
        listEmployees: await getData(employee, date),
        department:
          employee[0].department == 1
            ? "Nhân sự"
            : employee[0].department == 2
            ? "Lập trình"
            : "Kinh doanh",
      },
    });
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

const leaderCancelTimekeeping = async (req, res) => {
  const { token } = req.headers;
  const { listId, date } = req.body;
  try {
    if (token == "") {
      res.json({
        status: 0,
        code: 404,
        message: "thất bại",
        data: "",
      });
      return;
    }
    if (listId.length < 1) {
      res.json({
        status: 0,
        code: 404,
        message: "Bạn chưa gửi chấm công nào",
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
    await TimekeepingModel.update(
      {
        is_active: 0,
      },
      {
        where: {
          id: listId,
        },
      }
    );
    res.json({
      status: 1,
      code: 200,
      message: "Thành công",
      data: {
        listEmployees: await getData(employee, date),
        department:
          employee[0].department == 1
            ? "Nhân sự"
            : employee[0].department == 2
            ? "Lập trình"
            : "Kinh doanh",
      },
    });
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
const getData = async (employee, date) => {
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
      date_timekeeping: date,
      is_active: 1,
    },
    row: true,
  });
  return listEmployees;
};
export default {
  leaderComfirmTimekeeping,
  leaderCancelTimekeeping
};
