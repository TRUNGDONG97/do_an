import EmployeeModel from "../models/EmployeeModel";
import Constants from "../util/contant";
import { getArrayPages,PageCount } from "../util/funtions";
import url from "url";
import pug from 'pug'
const getEmployee = async (req, res, next) => {
  res.render("EmployeeView");
};
const searchEmployee = async (req, res, next) => {
  try {
    const { currentPage } = req.body;
    const { count, rows } = await EmployeeModel.findAndCountAll({
      offset: Constants.PER_PAGE * (currentPage - 1),
      limit: Constants.PER_PAGE,
      order: [["last_name", "ASC"]],
    });
    // console.log(count)
    const pageCount = PageCount(count);
    // console.log(students.length)
    console.log(
      " `${process.cwd()}/table/EmployeeTable.pug`;",
      `${process.cwd()}/src/table/EmployeeTable.pug`
    );
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
export default {
  getEmployee,
  searchEmployee,
};
