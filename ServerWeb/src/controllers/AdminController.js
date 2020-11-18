import Constants from "../util/contant";
import { getArrayPages, PageCount } from "../util/funtions";
import url from "url";
import pug from "pug";
import sequelize, { Op } from "sequelize";
import md5 from "md5";
import DateUtil from "../util/DateUtil";
import excel from "exceljs";
import AdminModel from "../models/AdminModel";
const getAdmin = async (req, res, next) => {
  res.render("AdminView");
};
const searchAdmin = async (req, res, next) => {
  try {
    const { currentPage } = req.body;
    console.log("currentPage", currentPage);
    // console.log("nameEmployee", nameEmployee);
    const { count, rows } = await AdminModel.findAndCountAll({
      where: {
        // [Op.and]: [
        //   sequelize.where(sequelize.fn("lower", sequelize.col("last_name")), {
        //     [Op.like]: "%" + nameEmployee + "%",
        //   }),
        //   sequelize.where(sequelize.fn("lower", sequelize.col("phone")), {
        //     [Op.like]: "%" + phoneEmployee + "%",
        //   }),
        //   {
        is_active: 1,
        //   },
        // ],
      },
      offset: Constants.PER_PAGE * (currentPage - 1),
      limit: Constants.PER_PAGE,
      order: [["username", "ASC"]],
    });
    // console.log(rows,"roew");
    var newListAdmin = [];
    for (let index = 0; index < rows.length; index++) {
      let admin={};
      admin.username = rows[index].username;
      admin.id = rows[index].id;
      admin.email = rows[index].email;
      admin.name = rows[index].name;
      admin.admin_add = rows[index].admin_add;
      admin.create_date = DateUtil.formatInputDate(rows[index].create_date);
      newListAdmin.push(admin)
    }
    // console.log(newListAdmin, "roew");
    const pageCount = PageCount(count);

    var urlTable = `${process.cwd()}/src/table/AdminTable.pug`;
    var htmlTable = pug.renderFile(urlTable, {
      admins: newListAdmin,
      STT: (currentPage - 1) * Constants.PER_PAGE,
      currentPage,
      pageCount: pageCount,
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
export default {
  getAdmin,
  searchAdmin,
};
