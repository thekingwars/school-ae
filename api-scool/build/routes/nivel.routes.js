"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _nivel = require("../controllers/nivel.controller");

const router = (0, _express.Router)();
router.post('/nivel', _nivel.createNivel);
router.get('/nivel', _nivel.findAllNivel);
router.get('/nivel/:nivel_id', _nivel.findNivel);
router.patch('/nivel/:nivel_id', _nivel.updateNivel);
router.delete('/nivel/:nivel_id', _nivel.deleteNivel);
var _default = router;
exports.default = _default;