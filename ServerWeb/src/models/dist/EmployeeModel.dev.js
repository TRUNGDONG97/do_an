"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _env = require("../config/env");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Employee = _env.sequelize.define("employee", {
  id: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  first_name: {
    type: _sequelize["default"].STRING
  },
  last_name: {
    type: _sequelize["default"].STRING
  },
  phone: {
    type: _sequelize["default"].STRING,
    unique: "compositeIndex"
  },
  password: {
    type: _sequelize["default"].STRING
  },
  birthday: {
    type: _sequelize["default"].DATE
  },
  address: {
    type: _sequelize["default"].STRING
  },
  email: {
    type: _sequelize["default"].STRING,
    unique: "compositeIndex"
  },
  token: {
    type: _sequelize["default"].STRING
  },
  gener: {
    type: _sequelize["default"].INTEGER
  },
  position: {
    type: _sequelize["default"].INTEGER
  },
  is_active: {
    type: _sequelize["default"].INTEGER
  }
}, {
  //
  timestamps: false,
  freezeTableName: true
});

var _default = Employee;
exports["default"] = _default;