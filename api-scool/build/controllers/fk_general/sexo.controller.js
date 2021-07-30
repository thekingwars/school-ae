"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.deleteSex = exports.updateSex = exports.findSex = exports.findAllSex = exports.createSex = void 0;

var _db = _interopRequireDefault(require("../../db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let sex;

const createSex = async(req, res) => {
    const {
        sexo_nome
    } = req.body;
    let sql = 'INSERT INTO sexo SET ?';
    const data = {
        sexo_nome
    };

    if (!sexo_nome) {
        return res.status(400).json({
            ok: false,
            err: 'Campos obrigatórios'
        });
    }

    sex = await addSql(sql, data);
    return res.status(201).json({
        ok: true,
        sex: await id(sex.insertId)
    });
};

exports.createSex = createSex;

const findAllSex = async(req, res) => {
    let sql = 'SELECT * FROM sexo';
    sex = await addSql(sql);
    console.log(req.decode);
    return res.status(200).json({
        ok: true,
        sex: sex
    });
};

exports.findAllSex = findAllSex;

const findSex = async(req, res) => {
    const {
        sexo_id
    } = req.params;
    let sql = 'SELECT * FROM sexo WHERE sexo_id = ?';
    sex = await addSql(sql, [sexo_id]);
    return res.status(200).json({
        ok: true,
        sexo: sex[0]
    });
};

exports.findSex = findSex;

const updateSex = async(req, res) => {
    const {
        sexo_nome
    } = req.body;
    let sql = 'UPDATE sexo SET ? WHERE sexo_id = ?';
    const data = {
        sexo_nome
    };

    if (!sexo_nome) {
        return res.status(400).json({
            ok: false,
            err: 'Campos obrigatórios'
        });
    }

    sex = await addSql(sql, [data, req.params.sexo_id]);
    return res.status(201).json({
        ok: true,
        sex: await id(req.params.sexo_id)
    });
};

exports.updateSex = updateSex;

const deleteSex = async(req, res) => {
    let sql = 'DELETE FROM sexo WHERE sexo_id = ?';
    sex = await addSql(sql, req.params.sexo_id);
    return res.status(201).json({
        ok: true,
        sex: 'Sexo eliminado con exito'
    });
}; //funciones de optimizacion


exports.deleteSex = deleteSex;

const addSql = async(sql, data) => {
    return await _db.default.query(sql, data);
};

const id = async id => {
    let sql = 'SELECT * FROM  sexo WHERE sexo_id = ?';
    sex = await addSql(sql, [id]);
    return sex;
};