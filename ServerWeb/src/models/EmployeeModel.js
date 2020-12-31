import Sequelize, { STRING } from "sequelize";
import { sequelize, Op } from "../config/env";
import TimekeepingModel from "./TimekeepingModel";
const Employee = sequelize.define(
  "employee",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: Sequelize.STRING,
    },
    last_name: {
      type: Sequelize.STRING,
    },
    phone: {
      type: Sequelize.STRING,
      unique: "compositeIndex",
    },
    password: {
      type: Sequelize.STRING,
    },
    birthday: {
      type: Sequelize.DATE,
    },
    address: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
      unique: "compositeIndex",
    },
    token: {
      type: Sequelize.STRING,
    },
    gener: {
      type: Sequelize.INTEGER,
    },
    position: {
      type: Sequelize.INTEGER, //1 nhân sự 2 coder 3 kinh doanh
    },
    is_active: {
      type: Sequelize.INTEGER,
    },
    employee_code: {
      type: Sequelize.STRING
    },
    department: {
      type: Sequelize.INTEGER //1 xếp 2 nhân viên
    },
    device_id:{
      type:Sequelize.STRING
    }
  },
  {
    //
    timestamps: false,
    freezeTableName: true,
  }
);
Employee.hasMany(TimekeepingModel, { foreignKey: 'id_employee', sourceKey: 'id' });
TimekeepingModel.belongsTo(Employee, { foreignKey: 'id_employee', targetKey: 'id' });
export default Employee;
