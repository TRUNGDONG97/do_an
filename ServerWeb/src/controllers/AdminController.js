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
const getCountAdmin = async (req, res, next) => {
  try {
    const countAdmin = await AdminModel.count({
      where:{
        is_active:1
      }
    });
    console.log(countAdmin);
    res.send({
      countAdmin,
    });
    return;
  } catch (error) {
    res.status(404).send();
    return;
  }
};
const searchAdmin = async (req, res, next) => {
  try {
    const { currentPage } = req.body;
    console.log("currentPage", currentPage);
    const { count, rows } = await AdminModel.findAndCountAll({
      where: {
        is_active: 1,
      },
      offset: Constants.PER_PAGE * (currentPage - 1),
      limit: Constants.PER_PAGE,
      order: [["username", "ASC"]],
    });
    // console.log(rows,"roew");
    var newListAdmin = [];
    for (let index = 0; index < rows.length; index++) {
      let admin = {};
      admin.username = rows[index].username;
      admin.id = rows[index].id;
      admin.email = rows[index].email;
      admin.name = rows[index].name;
      admin.admin_add = rows[index].admin_add;
      admin.create_date = DateUtil.formatInputDate(rows[index].create_date);
      newListAdmin.push(admin);
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
const addAdmin = async (req, res, next) => {
  try {
    const user_name_create = req.signedCookies.username;
    const { username, email, password } = req.body;
    const countUsername = await AdminModel.count({
      where: {
        username,
        is_active: 1,
      },
    });
    if (countUsername > 0) {
      res.send({
        result: 0,
      });
      return;
    }
    const countEmail = await AdminModel.count({
      where: {
        email,
        is_active: 1,
      },
    });

    if (countEmail > 0) {
      res.send({
        result: 1,
      });
      return;
    }
    await AdminModel.create({
      username,
      password: md5(password),
      email,
      admin_add: user_name_create,
    });
    res.send({
      result: 2,
    });
  } catch (error) {
    console.log(error);
    res.status(404).send();
    return;
  }
};
const deleteAdmin = async (req, res, next) => {
  const id = parseInt(req.body.id);
  // console.log(id)
  try {
    const admin = await AdminModel.findAll({
      where: {
        id,
        is_active: 1,
      },
    });
    // console.log(students.length)
    if (admin.length > 0) {
      await AdminModel.update(
        {
          is_active: 0,
        },
        {
          where: {
            id,
          },
        }
      );
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
const saveAdmin = async (req, res, next) => {
  try {
    const { username, email, id } = req.body;
    console.log("email", email);
    console.log("username", username);
    const countAdmin = await AdminModel.findAll({
      where: {
        id,
        is_active: 1,
      },
    });
    if (countAdmin.length < 1) {
      res.send({
        result: 0, //Notfound
      });
      return;
    }
    if (username != countAdmin[0].username) {
      const countUsername = await AdminModel.count({
        where: {
          is_active: 1,
          username
        }
      })
      if (countUsername > 0) {
        res.send({
          result: 1,
        });
        return;
      }
    }
    if (email != countAdmin[0].email) {
      const countEmail = await AdminModel.count({
        where: {
          is_active: 1,
          email
        }
      })
      if (countEmail > 0) {
        res.send({
          result: 2, //Notfound
        });
        return;
      }
    }

    const newAdmin = await AdminModel.update(
      {
        email,
        username
      }, {
      where: {
        id
      }
    })
    console.log("newAdmin", newAdmin);
    res.send({
      result: 3,
    });
  } catch (error) {
    res.status(404).send();
    return;
  }
}
export default {
  getAdmin,
  searchAdmin,
  addAdmin,
  deleteAdmin,
  getCountAdmin,
  saveAdmin
};
