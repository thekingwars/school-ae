"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transporter = void 0;

var _nodemailer = _interopRequireDefault(require("nodemailer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// create reusable transporter object using the default SMTP transport
const transporter = _nodemailer.default.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  // true for 465, false for other ports
  auth: {
    user: 'carlosguerra2001.2@gmail.com',
    // generated ethereal user
    pass: 'mnatcofytoejwsfl' // generated ethereal password

  }
});

exports.transporter = transporter;
transporter.verify().then(() => {
  console.log('Nodemailer funcionando correctamente');
}).catch(err => {
  console.log('Ha ocurrido un error');
});