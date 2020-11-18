import Sequelize from "sequelize";
import { sequelize, Op } from "../config/env";
const Admin = sequelize.define(
  "Admin",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
      unique: "compositeIndex",
    },
    is_active: {
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
    },
    token: {
      type: Sequelize.STRING,
    },
    admin_add: {
      type: Sequelize.STRING,
    },
    create_date: {
      type: Sequelize.DATE,
    },
  },
  {
    //
    timestamps: false,
    freezeTableName: true,
  }
);
export default Admin;
