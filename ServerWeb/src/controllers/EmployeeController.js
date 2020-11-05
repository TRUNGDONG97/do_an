import EmployeeModel from "../models/EmployeeModel";
import Constants from "../util/contant";
import { getArrayPages, PageCount } from "../util/funtions";
import url from "url";
import pug from "pug";
import sequelize, { Op } from "sequelize";
import md5 from "md5";
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
    console.log("dsadsad")
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
     console.log(error)
     res.status(404).send()
     return;
  }
};
export default {
  getEmployee,
  searchEmployee,
  addEmployee,
};
