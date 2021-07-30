"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.storage = void 0;

var _multer = _interopRequireDefault(require("multer"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const storage = _multer.default.diskStorage({
  destination: (req, file, cb) => {
    cb(null, _path.default.join(__dirname, '../public'));
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname} - ${Date.now()}.${file.mimetype.split('/')[1]}`);
  }
});

exports.storage = storage;