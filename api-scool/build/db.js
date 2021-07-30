"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mysql = _interopRequireDefault(require("mysql2"));

var _util = require("util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config({
  path: `.env.development`
});

const myConnection = _mysql.default.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

myConnection.connect(function (err) {
  if (err) {
    console.log('Ha ocurrido un error con la conexión: ' + err);
    return;
  }

  console.log('Nos hemos conectado con éxito en la base de datos');
});
myConnection.query = (0, _util.promisify)(myConnection.query);
var _default = myConnection;
exports.default = _default;