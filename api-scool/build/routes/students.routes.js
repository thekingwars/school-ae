"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _register = require("../controllers/students/register.students");

var _family = require("../controllers/students/family.students");

var _auth = require("../middlewares/auth.middleware");

var _students = require("../controllers/students/students");

const router = (0, _express.Router)(); //register and login

router.post('/register', _register.register);
router.post('/login', _register.login);
router.post('/verifyEmail', _register.verifyEmail);
router.post('/verifyPhone', _register.verifyPhone);
router.post('/forgoutPassword', _register.forgoutPassword);
router.patch('/recoverPassword/:token', _register.recoverPassword); //Student info

router.get('/user', [_auth.notToken], _students.user);
router.get('/getUser/:id', [_auth.notToken], _students.getStudent); //profile

router.patch('/profile/:id/dadInfo', [_auth.notToken], _family.dadInformation);
router.patch('/profile/:id/momInfo', [_auth.notToken], _family.momInformation);
router.patch('/profile/:id/alunoInfo', [_students.uploader], _students.infoUserExtra);
var _default = router;
exports.default = _default;