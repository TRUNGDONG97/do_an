const Sequelize = require("sequelize");
// const { debug } = require("../utils/constant");
// const CONSTANT = require("../utils/constant");

const env = {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    // password: process.env.DB_PASSWORD || "123456Aa@",
    password: process.env.DB_PASSWORD || "admin",
    database: process.env.DB_NAME || "managertimed"
}

const sequelize = new Sequelize(env.database, env.user, env.password, {
    host: env.host,
    dialect: "mysql",
    // logging: debug.db,
    logging: false,
    query: { raw: false },
    timezone: "+07:00",
    // pool: {
    //   max: 30,
    //   min: 0,
    //   acquire: 60000,
    //   idle: 5000
    // },
    define: {
        // rejectOnEmpty: Promise.reject({
        //   code: CONSTANT.apiCode.NOT_FOUND
        // })
        hooks: true
    }
});
sequelize.authenticate()
    .then(() => console.log("true"))
    .catch(err => console.log(err))
module.exports = sequelize;