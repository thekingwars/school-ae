"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.deleteNivel = exports.updateNivel = exports.findNivel = exports.findAllNivel = exports.createNivel = void 0;

var _db = _interopRequireDefault(require("../db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let nivel;

const createNivel = async(req, res) => {
    const {
        nivel_nome
    } = req.body;
    let sql = 'INSERT INTO nivel SET ?';
    const data = {
        nivel_nome
    };

    if (!nivel_nome) {
        return res.status(400).json({
            ok: false,
            err: 'Campos obrigatórios'
        });
    }

    nivel = await addSql(sql, data);
    return res.status(201).json({
        ok: true,
        nivel: await id(nivel.insertId)
    });
};

exports.createNivel = createNivel;

const findAllNivel = async(req, res) => {
    let sql = 'SELECT * FROM nivel';
    nivel = await addSql(sql);
    return res.status(200).json({
        ok: true,
        nivel: nivel
    });
};

exports.findAllNivel = findAllNivel;

const findNivel = async(req, res) => {
    const {
        nivel_id
    } = req.params;
    let sql = 'SELECT * FROM nivel WHERE nivel_id = ?';
    nivel = await addSql(sql, [nivel_id]);
    return res.status(200).json({
        ok: true,
        nivel: nivel
    });
};

exports.findNivel = findNivel;

const updateNivel = async(req, res) => {
    const {
        nivel_nome
    } = req.body;
    let sql = 'UPDATE nivel SET ? WHERE nivel_id = ?';
    const data = {
        nivel_nome
    };

    if (!nivel_nome) {
        return res.status(400).json({
            ok: false,
            err: 'Campos obrigatórios'
        });
    }

    nivel = await addSql(sql, [data, req.params.nivel_id]);
    return res.status(201).json({
        ok: true,
        nivel: await id(req.params.nivel_id)
    });
};

exports.updateNivel = updateNivel;

const deleteNivel = async(req, res) => {
    let sql = 'DELETE FROM nivel WHERE nivel_id = ?';
    nivel = await addSql(sql, req.params.nivel_id);
    return res.status(201).json({
        ok: true,
        sex: 'Nivel eliminado con exito'
    });
}; //funciones de optimizacion


exports.deleteNivel = deleteNivel;

const addSql = async(sql, data) => {
    return await _db.default.query(sql, data);
};

const id = async id => {
    let sql = 'SELECT * FROM nivel WHERE nivel_id = ?';
    nivel = await addSql(sql, [id]);
    return nivel;
};