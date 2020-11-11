import EmployeeModel from "../models/EmployeeModel";
import Constants from "../util/contant";
import { getArrayPages, PageCount } from "../util/funtions";
import url from "url";
import pug from "pug";
import sequelize, { Op } from "sequelize";
import md5 from "md5";
import DateUtil from "../util/DateUtil";
const getEmployee = async (req, res, next) => {
  res.render("EmployeeView");
};
const searchEmployee = async (req, res, next) => {
  try {
    const { currentPage, phoneEmployee, nameEmployee } = req.body;
    // console.log("phoneEmployee", phoneEmployee);
    // console.log("nameEmployee", nameEmployee);
    const { count, rows } = await EmployeeModel.findAndCountAll({
      where: {
        [Op.and]: [
          sequelize.where(sequelize.fn("lower", sequelize.col("last_name")), {
            [Op.like]: "%" + nameEmployee + "%",
          }),
          sequelize.where(sequelize.fn("lower", sequelize.col("phone")), {
            [Op.like]: "%" + phoneEmployee + "%",
          }),
        ],
      },
      offset: Constants.PER_PAGE * (currentPage - 1),
      limit: Constants.PER_PAGE,
      order: [["last_name", "ASC"]],
    });
    const pageCount = PageCount(count);

    var urlTable = `${process.cwd()}/src/table/EmployeeTable.pug`;
    var htmlTable = await pug.renderFile(urlTable, {
      employees: rows,
      STT: (currentPage - 1) * Constants.PER_PAGE,
      currentPage,
      pageCount: pageCount,
      search: false,
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
};
const addEmployee = async (req, res, next) => {
  const {
    first_name,
    last_name,
    phone,
    birthday,
    address,
    email,
    gener,
    position,
  } = req.body;
  try {
    const countPhone = await EmployeeModel.count({
      where: {
        phone,
      },
    });
    if (countPhone > 0) {
      res.send({ result: 0 });
      return;
    }
    const countEmail = await EmployeeModel.count({
      where: {
        email,
      },
    });
    if (countEmail > 0) {
      res.send({ result: 1 });
      return;
    }
    const newEmployee = await EmployeeModel.create({
      first_name,
      last_name,
      phone,
      password: md5(phone),
      birthday,
      address,
      email,
      gener,
      position,
    });
    // console.log
    res.send({
      result: 3,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(404).send();
    return;
  }
};
const saveEmployee = async (req, res, next) => {
  const {
    first_name,
    last_name,
    phone,
    birthday,
    address,
    email,
    gener,
    position,
    idEmployee,
  } = req.body;
  try {
    const employee = await EmployeeModel.findAll({
      where: {
        id: idEmployee,
      },
    });
    if (employee.length > 0 && phone !== employee[0].phone) {
      const countPhone = await EmployeeModel.count({
        where: {
          phone,
        },
      });
      if (countPhone > 0) {
        res.send({ result: 0 });
        return;
      }
    }
    if (employee.length > 0 && email !== employee[0].email) {
      const countEmail = await EmployeeModel.count({
        where: {
          email,
        },
      });
      if (countEmail > 0) {
        res.send({ result: 1 });
        return;
      }
    }
    if (employee.length <= 0) {
      res.send({ result: 2 });
      return;
    }
    const newEmployee = await EmployeeModel.update(
      {
        first_name,
        last_name,
        phone,
        birthday,
        address,
        email,
        gener,
        position,
      },
      {
        where: {
          id: idEmployee,
        },
      }
    );
    res.send({
      result: 3,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(404).send();
    return;
  }
};
const deleteEmployee = async (req, res, next) => {
  const id = parseInt(req.body.id);
  // console.log(id)
  try {
    const employee = await EmployeeModel.findAll({
      where: {
        id,
      },
    });
    // console.log(students.length)
    if (employee.length > 0) {
      await EmployeeModel.destroy({
        where: {
          id,
        },
      });
      res.send({
        result: 1,
      });
    } else {
      res.send({
        result: 0, //Notfound
      });
    }
    return;
  } catch (error) {
    res.status(404).send();
    return;
  }
};
const importListEmployee = async (req, res, next) => {
  try {
    const arrEmployee = JSON.parse(req.body.arrEmployee);
    // console.log(DateUtil.formatInputDate(arrEmployee[2].birthday),"arrEmployee")
    console.log(arrEmployee[0],"arrEmployee")
    var listEmployeeError = [];
    for (let index = 0; index < arrEmployee.length; index++) {
      if (!arrEmployee[index].phone) {
        let nameEmployee =
          arrEmployee[index].first_name + arrEmployee[index].last_name;
        listEmployeeError.push(nameEmployee);
        continue;
      }
      var countPhone = await EmployeeModel.count({
        where: {
          phone: "0" + arrEmployee[index].phone.toString(),
        },
      });
      if (countPhone > 0) {
        await EmployeeModel.update(
          {
            first_name: arrEmployee[index].first_name,
            last_name: arrEmployee[index].last_name,
            password: md5(arrEmployee[index].phone.toString()),
            address: arrEmployee[index].address,
            birthday: arrEmployee[index].birthday
              ? DateUtil.formatInputDate(arrEmployee[index].birthday)
              : "",
            gener: arrEmployee[index].sex == "nam" ? 1 : 0,
            email: arrEmployee[index].email,
            position: arrEmployee[index].position == "sếp" ? 1 : 0,
          },
          {
            where: {
              phone: "0" + arrEmployee[index].phone.toString(),
            },
          }
        );
        console.log(1);
      } else {
        await EmployeeModel.create({
          first_name: arrEmployee[index].first_name,
          last_name: arrEmployee[index].last_name,
          password: md5(arrEmployee[index].phone.toString()),
          address: arrEmployee[index].address,
          birthday: arrEmployee[index].birthday
            ? DateUtil.formatInputDate(arrEmployee[index].birthday)
            : "",
          gener: arrEmployee[index].sex == "nam" ? 1 : 0,
          email: arrEmployee[index].email,
          phone: arrEmployee[index].phone
            ? "0" + arrEmployee[index].phone.toString()
            : "",
          position: arrEmployee[index].position == "sếp" ? 1 : 0,
        });
        console.log(2);
      }
    }
    res.send({
      result: 1,
      listEmployeeError,
    });
  } catch (error) {
    console.log(error);
    res.status(404).send();
    return;
  }
};
export default {
  getEmployee,
  searchEmployee,
  addEmployee,
  saveEmployee,
  deleteEmployee,
  importListEmployee,
};
