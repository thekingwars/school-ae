"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _sex = _interopRequireDefault(require("./sex.routes"));

var _nivel = _interopRequireDefault(require("./nivel.routes"));

var _students = _interopRequireDefault(require("./students.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)();
router.use('/', _sex.default);
router.use('/', _nivel.default);
router.use('/student', _students.default);
var _default = router;
exports.default = _default;