import Sequelize, { STRING } from "sequelize";
import { sequelize, Op } from "../config/env";
const Timekeeping = sequelize.define(
    "timekeeping",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_employee: {
            type: Sequelize.INTEGER
        },
        time_checkin: {
            type: Sequelize.TIME
        },
        time_checkout: {
            type: Sequelize.TIME
        },
        date_timekeeping: {
            type: Sequelize.DATE
        },
        is_active: {
            type: Sequelize.INTEGER
        },
        time_late: {
            type: Sequelize.INTEGER
        },
        workday:{
            type:Sequelize.INTEGER
        }
    },
    {
        //
        timestamps: false,
        freezeTableName: true,
    }
);
export default Timekeeping;
