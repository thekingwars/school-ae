"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.comparePassword = exports.passwordEncrypt = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const passwordEncrypt = password => {
  const salt = _bcrypt.default.genSaltSync(10);

  return _bcrypt.default.hashSync(password, salt);
};

exports.passwordEncrypt = passwordEncrypt;

const comparePassword = (password, passwordBD) => {
  return _bcrypt.default.compareSync(password, passwordBD);
};

exports.comparePassword = comparePassword;