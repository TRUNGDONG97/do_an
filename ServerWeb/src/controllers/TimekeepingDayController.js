import EmployeeModel from "../models/EmployeeModel";
import TimekeepingModel from "../models/TimekeepingModel";
import Constants from "../util/contant";
import { getArrayPages, PageCount } from "../util/funtions";
import url from "url";
import pug from "pug";
import sequelize, { Op, where } from "sequelize";

const getTimekeeping = async (req, res, next) => {
  res.render("TimekeepingDayView");
};
const searchTimekeeping = async (req, res) => {
  try {
    const { currentPage, employee_code, nameEmployee, date } = req.body;
    console.log("currentPage", currentPage);

    console.log("timekeeping", employee_code);
    const { rows, count } = await TimekeepingModel.findAndCountAll({
      include: [
        {
          model: EmployeeModel,
          where: {
            [Op.and]: [
              sequelize.where(
                sequelize.fn("lower", sequelize.col("last_name")),
                {
                  [Op.like]: "%" + nameEmployee + "%",
                }
              ),
              sequelize.where(
                sequelize.fn("lower", sequelize.col("employee_code")),
                {
                  [Op.like]: "%" + employee_code + "%",
                }
              ),
              {
                is_active: 1,
              },
            ],
          },
          order: [["last_name", "ASC"]],
        },
      ],
      where: {
        date_timekeeping: date,
        is_active:1
      },
      row: true,
      offset: Constants.PER_PAGE * (currentPage - 1),
      limit: Constants.PER_PAGE,
      // order: [["last_name", "ASC"]],
    });
    console.log("rows", count);
    var urlTable = `${process.cwd()}/src/table/TimekeepingDayTable.pug`;
    var htmlTable = await pug.renderFile(urlTable, {
      timekeeping: rows,
      STT: (currentPage - 1) * Constants.PER_PAGE,
      currentPage,
      pageCount: PageCount(count),
      pages: getArrayPages(req)(PageCount(count), currentPage),
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
const confirmTimekeeping = async (req, res) => {
  const { arrId } = req.body;
  const arrIdUpdate = JSON.parse(arrId);
  try {
    await TimekeepingModel.update(
      {
        type: 1,
      },
      {
        where: {
          id: [arrIdUpdate],
        },
      }
    );
    res.send({
      result: 3,
    });
  } catch (error) {
    console.log(error);
    res.status(404).send();
    return;
  }
};
const deleteTimekeeping = async (req, res) => {
  const { arrId } = req.body;
  const arrIdUpdate = JSON.parse(arrId);
  try {
    await TimekeepingModel.update(
      {
        is_active: 0,
      },
      {
        where: {
          id: [arrIdUpdate],
        },
      }
    );
    res.send({
      result: 3,
    });
  } catch (error) {
    console.log(error);
    res.status(404).send();
    return;
  }
};
export default {
  getTimekeeping,
  searchTimekeeping,
  confirmTimekeeping,
  deleteTimekeeping
};
