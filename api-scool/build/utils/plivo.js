"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clientPlivo = void 0;

var _plivo = require("plivo");

const clientPlivo = async (src, dst, text) => {
  let client = new _plivo.Client(process.env.PLIVO_AUTH_ID, process.env.PLIVO_AUTH_TOKEN);
  let message = await client.messages.create(src, dst, text);
  console.log(message);
  return message;
};

exports.clientPlivo = clientPlivo;