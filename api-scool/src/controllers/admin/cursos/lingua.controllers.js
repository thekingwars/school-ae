import db from '../../../db';
let lingua;

export const createLingua = async(req, res) => {
    const { lingua_abreviatura, lingua_nome } = req.body;

    let sql = 'INSERT INTO lingua SET ?';

    const data = {
        lingua_abreviatura,
        lingua_nome
    }

    if (!lingua_abreviatura || !lingua_nome) {
        return res.status(400).json({ ok: false, err: 'Campos obrigatórios' });
    }

    if (lingua_abreviatura.length > 1) {
        return res.status(400).json({ ok: false, err: 'A abreviatura pode ter apenas um carácter' });
    }

    if (lingua_nome.length > 5) {
        return res.status(400).json({ ok: false, err: 'A abreviatura pode ter apenas 5 carácter' });
    }


    lingua = await addSql(sql, data);

    return res.status(201).json({ ok: true, lingua: await id(lingua.insertId) });
}

export const findAllLingua = async(req, res) => {
    let sql = 'SELECT * FROM lingua';

    lingua = await addSql(sql);

    return res.status(200).json({ ok: true, lingua: lingua });
}

export const findLingua = async(req, res) => {
    const { id } = req.params;
    let sql = 'SELECT * FROM lingua WHERE lingua_id = ?';
    lingua = await addSql(sql, [id]);
    return res.status(200).json({ ok: true, lingua: lingua[0] });
}

export const updateLingua = async(req, res) => {
    let sql = 'UPDATE lingua SET ? WHERE lingua_id = ?';
    const { lingua_abreviatura, lingua_nome } = req.body;
    const data = {
        lingua_abreviatura,
        lingua_nome
    }

    if (!lingua_abreviatura || !lingua_nome) {
        return res.status(400).json({ ok: false, err: 'Campos obrigatórios' });
    }

    if (lingua_abreviatura.length > 1) {
        return res.status(400).json({ ok: false, err: 'A abreviatura pode ter apenas um carácter' });
    }

    lingua = await addSql(sql, [data, req.params.id]);

    return res.status(201).json({ ok: true, lingua: await id(req.params.id) });
}

export const deleteLingua = async(req, res) => {
    let sql = 'DELETE FROM lingua WHERE lingua_id = ?';
    lingua = await addSql(sql, req.params.id);
    return res.status(201).json({ ok: true, sex: 'lingua eliminada com sucesso' });
}

//funciones de optimizacion
const addSql = async(sql, data) => {
    return await db.query(sql, data);
}

const id = async(id) => {
    let sql = 'SELECT * FROM lingua WHERE lingua_id = ?';
    lingua = await addSql(sql, [id]);
    return lingua;
}