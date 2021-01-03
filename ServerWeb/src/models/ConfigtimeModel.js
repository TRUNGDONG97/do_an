import Sequelize, { STRING } from "sequelize";
import { sequelize, Op } from "../config/env";
const ConfigTime = sequelize.define(
  "config_time",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    time_start_work_morning: {
      type: Sequelize.INTEGER,
    },
    time_start_checkin_morning: {
      type: Sequelize.INTEGER,
    },
    time_end_checkin_morning: {
      type: Sequelize.INTEGER,
    },
    time_start_checkout_morning: {
      type: Sequelize.INTEGER,
    },
    time_end_checkout_morning: {
      type: Sequelize.INTEGER,
    },
    time_start_work_afternoon: {
      type: Sequelize.INTEGER,
    },
    time_start_checkin_afternoon: {
      type: Sequelize.INTEGER,
    },
    time_end_checkin_afternoon: {
      type: Sequelize.INTEGER,
    },
    time_start_checkout_afternoon: {
      type: Sequelize.INTEGER,
    },
    time_end_checkout_afternoon: {
      type: Sequelize.INTEGER,
    },
    max_time_late: {
      type: Sequelize.INTEGER,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

export default ConfigTime;
