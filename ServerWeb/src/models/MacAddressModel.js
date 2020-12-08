import Sequelize from "sequelize";
import { sequelize, Op } from "../config/env";
const MacAdress = sequelize.define(
  "mac_address",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    address_mac: {
      type: Sequelize.STRING,
    },
    is_active: {
      type: Sequelize.INTEGER,
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
export default MacAdress;
