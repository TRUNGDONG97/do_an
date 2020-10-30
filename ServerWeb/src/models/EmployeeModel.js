import Sequelize from 'sequelize'
import { sequelize, Op } from '../config/env'
const Employee= sequelize.define('employee', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    first_name: {
        type: Sequelize.STRING
    },
    last_name: {
        type: Sequelize.STRING
    },
    phone: {
        type: Sequelize.STRING,
        unique: 'compositeIndex'
    },
    password: {
        type: Sequelize.STRING
    },
    birthday: {
        type: Sequelize.DATE
    },
    address: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING,
        unique: 'compositeIndex'
    },
    token: {
        type: Sequelize.STRING
    },
    gener: {
        type: Sequelize.INTEGER
    },
    position:{
        type:Sequelize.INTEGER
    }

   
},{
    //
    timestamps:false,   
    freezeTableName: true ,
})
export default Employee