"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _env = require("../config/env");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Admin = _env.sequelize.define("Admin", {
  id: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: _sequelize["default"].STRING
  },
  password: {
    type: _sequelize["default"].STRING
  },
  email: {
    type: _sequelize["default"].STRING,
    unique: "compositeIndex"
  },
  is_active: {
    type: _sequelize["default"].INTEGER
  },
  name: {
    type: _sequelize["default"].STRING
  },
  token: {
    type: _sequelize["default"].STRING
  },
  admin_add: {
    type: _sequelize["default"].STRING
  },
  create_date: {
    type: _sequelize["default"].DATE
  }
}, {
  //
  timestamps: false,
  freezeTableName: true
});

var _default = Admin;
exports["default"] = _default;