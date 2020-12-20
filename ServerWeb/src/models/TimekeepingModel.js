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
            type: Sequelize.INTEGER
        },
        time_checkout: {
            type: Sequelize.INTEGER
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
        },
        note:{
            type:Sequelize.STRING
        },
        status:{
            type:Sequelize.INTEGER, //0  hoăc 1 chỉ trạng thái checkin hay chưa , nếu bằng 3 đã xin nghỉ
        }
    },
    {
        //
        timestamps: false,
        freezeTableName: true,
    }
);
export default Timekeeping;
