import sequelize from "sequelize";
import md5 from "md5";
import crypto from "crypto-js";
import EmployeeModel from "../../models/EmployeeModel";
const login = async (req, res, next) => {
  const { user, password, deviceID } = req.body;
  // console.log(user);
  // console.log(password);
  // console.log(type);

  console.log(deviceID, "device_id");
  if (user == "" || password == "") {
    res.json({
      status: 0,
      code: 400,
      message: "Kiểm tra dữ liệu đầu vào",
      data: "",
    });
    return;
  }
  try {
      const employee = await EmployeeModel.findAndCountAll({
        
        where: {
          phone: user,
          password: md5(password),
          is_active:1
        },
      });
      if (employee.count < 1) {
        res.json({
          status: 0,
          code: 513,
          message: "Sai tài khoản hoặc mật khẩu",
          data: "",
        });
        return;
      } else {
        var timeNow = new Date().getTime();
        var token = crypto.AES.encrypt(
          timeNow.toString(),
          password + employee.rows[0].employee_code
        ).toString();
        // console.log(token)
        await EmployeeModel.update(
          {
            token,
            device_id: deviceID,
          },
          {
            where: {
              id: employee.rows[0].id,
              is_active:1
            },
          }
        );
        employee.rows[0].token = token;
        employee.rows[0].device_id = deviceID;
        employee.rows[0].birthday = employee.rows[0].birthday
          .toString()
          .split("-")
          .reverse()
          .join("/");
        res.json({
          status: 1,
          code: 200,
          message: "",
          data: employee.rows[0],
        });
        return;
      }
    
  } catch (error) {
    console.log(error);
    res.json({
      status: 0,
      code: 404,
      message: "Đã có lỗi xảy ra",
      data: error,
    });
    return;
  }
};
const logout = async (req, res, next) => {
  const { token } = req.headers;
  // console.log(token)
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
    const teacher = await TeacherModel.findAndCountAll({
      where: {
        token,
      },
    });
    if (teacher.count > 0) {
      await TeacherModel.update(
        {
          token: null,
          device_id: null,
        },
        {
          where: {
            id: teacher.rows[0].id,
          },
        }
      );
      res.json({
        status: 1,
        code: 200,
        message: "thành công",
        data: "",
      });
      return;
    }

    // if (teacher.count < 0 && student < 0){
    res.json({
      status: 0,
      code: 403,
      message: "Chưa đăng nhập",
      data: "",
    });
    return;
  } catch (error) {
    res.json({
      status: 0,
      code: 404,
      message: "Đã có lỗi xảy ra",
      data: "",
    });
    return;
  }
};

// const getListClass=async(req,res,next)=>{

// }

export default {
  login,
  logout,
  // getListClass
};
