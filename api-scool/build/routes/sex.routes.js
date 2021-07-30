"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _sexo = require("../controllers/fk_general/sexo.controller");

var _auth = require("../middlewares/auth.middleware");

const router = (0, _express.Router)();
router.post('/sex', [_auth.notToken], _sexo.createSex);
router.get('/sex', [_auth.notToken, _auth.verifyCodeEmail], _sexo.findAllSex);
router.get('/sex/:sexo_id', _sexo.findSex);
router.patch('/sex/:sexo_id', _sexo.updateSex);
router.delete('/sex/:sexo_id', _sexo.deleteSex);
var _default = router;
exports.default = _default;