"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.verifyCodeEmail = exports.notToken = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _db = _interopRequireDefault(require("../db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const notToken = (req, res, next) => {
    if (!req.headers.authorization) {
        res.status(401).json({
            msg: "Acesso não autorizado"
        });
    } else {
        let token = req.headers.authorization.split(" ")[1];
        console.log(token);

        _jsonwebtoken.default.verify(token, 'mySecretKey', (err, decode) => {
            if (err) {
                res.status(500).json({
                    err: 'Token invalido'
                });
            } else {
                req.decode = decode;
                next();
            }
        });
    }
};

exports.notToken = notToken;

const verifyCodeEmail = async(req, res, next) => {
    let sql = `SELECT a1.fk_UserID, b1.ID, b1.valEmail, b1.valTelf
                FROM alunos a1 JOIN valida b1 ON a1.fk_UserID = b1.ID 
                WHERE a1.aluno_id = ?`;
    const fk = await _db.default.query(sql, req.decode.id);

    if (fk.length === 0) {
        res.status(400).json({
            msg: "Error con el usuario"
        });
    } else {
        if (fk[0].valEmail == false && fk[0].valTelf == false) {
            res.status(401).json({
                msg: "Acesso não autorizado, deve validar o seu e-mail e número de telefone"
            });
        } else {
            next();
        }
    }
};

exports.verifyCodeEmail = verifyCodeEmail;