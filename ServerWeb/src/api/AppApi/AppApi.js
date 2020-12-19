import NotificationModel from "../../models/NotificationModel";
import EmployeeModel from "../../models/EmployeeModel";
import md5 from 'md5';

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
      },
    });
    if (employee.count > 0) {
      const ListNoti = await NotificationModel.findAll({
        where: {
          id_employee: employee.rows[0].id,
        },
        order: [["created_date", "DESC"]],
      });
      // pushNotificationAppemployee('d4194038-1130-4ba4-8e09-9ae44b14cc00',
      //     ' dang điểm danh',
      //     { class_id: 4 })
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
    if (token == '') {
        res.json({
            "status": 0,
            "code": 404,
            "message": 'thất bại',
            "data": ""
        })
        return;
    }
    const { oldPassword, newPassword } = req.body
    try {
        const employee = await EmployeeModel.findAndCountAll({
            where: {
                token
            }
        })
        if (employee.count > 0) {
            if (employee.rows[0].password.trim() != md5(oldPassword.trim())) {
                res.json({
                    "status": 0,
                    "code": 404,
                    "message": 'Mật khẩu cũ không đúng',
                    "data": {}
                })
                return;
            }
            const updatePass = await EmployeeModel.update(
                {
                    password: md5(newPassword),
                }, {
                where: {
                    token
                }
            })
            res.json({
                "status": 1,
                "code": 200,
                "message": 'Đổi mật khẩu thành công',
                "data": {}
            })
            return;
        }
        res.json({
            "status": 0,
            "code": 403,
            "message": 'Chưa đăng nhập',
            "data": ""
        })
        return;
    } catch (error) {
        console.log(error)
        res.json({
            "status": 0,
            "code": 404,
            "message": "Đã có lỗi xảy ra",
            "data": ''
        })
        return;
    }
}
export default {
  notification,
  getUserInfo,
  changeUserInfo,
  changePass
};
