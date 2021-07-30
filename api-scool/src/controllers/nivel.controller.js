import db from '../db';
let nivel;

export const createNivel = async(req, res) => {
    const { nivel_nome } = req.body;

    let sql = 'INSERT INTO nivel SET ?';

    const data = {
        nivel_nome
    }

    if (!nivel_nome) {
        return res.status(400).json({ ok: false, err: 'Campos requeridos' });
    }

    nivel = await addSql(sql, data);

    return res.status(201).json({ ok: true, nivel: await id(nivel.insertId) });
}

export const findAllNivel = async(req, res) => {
    let sql = 'SELECT * FROM nivel';

    nivel = await addSql(sql);

    return res.status(200).json({ ok: true, nivel: nivel });
}

export const findNivel = async(req, res) => {
    const { nivel_id } = req.params;
    let sql = 'SELECT * FROM nivel WHERE nivel_id = ?';
    nivel = await addSql(sql, [nivel_id]);

    return res.status(200).json({ ok: true, nivel: nivel });
}

export const updateNivel = async(req, res) => {
    const { nivel_nome } = req.body
    let sql = 'UPDATE nivel SET ? WHERE nivel_id = ?';
    const data = {
        nivel_nome
    }

    if (!nivel_nome) {
        return res.status(400).json({ ok: false, err: 'Campos requeridos' });
    }

    nivel = await addSql(sql, [data, req.params.nivel_id]);

    return res.status(201).json({ ok: true, nivel: await id(req.params.nivel_id) });
}

export const deleteNivel = async(req, res) => {
    let sql = 'DELETE FROM nivel WHERE nivel_id = ?';
    nivel = await addSql(sql, req.params.nivel_id);
    return res.status(201).json({ ok: true, sex: 'Nivel eliminado con exito' });
}

//funciones de optimizacion
const addSql = async(sql, data) => {
    return await db.query(sql, data);
}

const id = async(id) => {
    let sql = 'SELECT * FROM nivel WHERE nivel_id = ?';
    nivel = await addSql(sql, [id]);
    return nivel;
}