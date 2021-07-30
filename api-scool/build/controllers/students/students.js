"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.infoUserExtra = exports.user = exports.getStudent = exports.uploader = void 0;

var _db = _interopRequireDefault(require("../../db"));

var _multer = require("../../config/multer");

var _multer2 = _interopRequireDefault(require("multer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const uploader = (0, _multer2.default)({
    storage: _multer.storage
}).single('aluno_foto');
exports.uploader = uploader;

const getStudent = async(req, res) => {
    const {
        id
    } = req.params;
    let sql = 'SELECT * FROM alunos WHERE aluno_id = ?';
    let student = await _db.default.query(sql, id);
    return res.status(200).json({
        ok: true,
        student
    });
};

exports.getStudent = getStudent;

const user = (req, res) => {
    return res.status(200).json({
        ok: true,
        user: req.decode
    });
};

exports.user = user;

const infoUserExtra = async(req, res) => {
    const {
        id
    } = req.params;
    const {
        aluno_sexo,
        aluno_nacionalidade,
        aluno_tipo_doc_ident,
        aluno_num_doc_ident,
        aluno_data_nascimento,
        aluno_nif
    } = req.body;
    const file = req.file;
    const data = {
        aluno_sexo,
        aluno_nacionalidade,
        aluno_tipo_doc_ident,
        aluno_num_doc_ident,
        aluno_data_nascimento,
        aluno_nif,
        aluno_foto: `http://localhost:3000/${file.filename}`
    };
    console.log(file);

    if (!aluno_sexo || !aluno_nacionalidade || !aluno_tipo_doc_ident || !aluno_num_doc_ident || !aluno_data_nascimento || !aluno_nif || !file) {
        return res.status(401).json({
            ok: false,
            err: 'Campos obrigatórios'
        });
    }

    let sql = 'UPDATE alunos SET ? WHERE aluno_id = ?';
    let student = await _db.default.query(sql, [data, id]);
    return res.status(200).json({
        ok: true,
        student
    });
};

exports.infoUserExtra = infoUserExtra;