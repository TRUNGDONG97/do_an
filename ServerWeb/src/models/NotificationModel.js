import Sequelize from 'sequelize'
import { sequelize, Op } from "../config/env";
const Notification = sequelize.define('Notification', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    created_date: {
        type: Sequelize.DATE
    },
    type: {
        type: Sequelize.INTEGER
    },
    id_employee: {
        type: Sequelize.INTEGER
    },
    content: {
        type: Sequelize.STRING
    }
}, {
    //
    timestamps: false,
    freezeTableName: true,
})
export default Notification