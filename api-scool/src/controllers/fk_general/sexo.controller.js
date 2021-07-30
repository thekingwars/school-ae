import db from '../../db';
let sex;

export const createSex = async(req, res) => {
    const { sexo_nome } = req.body;

    let sql = 'INSERT INTO sexo SET ?';

    const data = {
        sexo_nome
    }

    if (!sexo_nome) {
        return res.status(400).json({ ok: false, err: 'Campos requeridos' });
    }

    sex = await addSql(sql, data);

    return res.status(201).json({ ok: true, sex: await id(sex.insertId) });
}

export const findAllSex = async(req, res) => {
    let sql = 'SELECT * FROM sexo';

    sex = await addSql(sql);

    console.log(req.decode)

    return res.status(200).json({ ok: true, sex: sex });
}

export const findSex = async(req, res) => {
    const { sexo_id } = req.params;
    let sql = 'SELECT * FROM sexo WHERE sexo_id = ?';
    sex = await addSql(sql, [sexo_id]);
    return res.status(200).json({ ok: true, sexo: sex[0] });
}

export const updateSex = async(req, res) => {
    const { sexo_nome } = req.body
    let sql = 'UPDATE sexo SET ? WHERE sexo_id = ?';
    const data = {
        sexo_nome
    }

    if (!sexo_nome) {
        return res.status(400).json({ ok: false, err: 'Campos requeridos' });
    }

    sex = await addSql(sql, [data, req.params.sexo_id]);

    return res.status(201).json({ ok: true, sex: await id(req.params.sexo_id) });
}

export const deleteSex = async(req, res) => {
    let sql = 'DELETE FROM sexo WHERE sexo_id = ?';
    sex = await addSql(sql, req.params.sexo_id);
    return res.status(201).json({ ok: true, sex: 'Sexo eliminado con exito' });
}

//funciones de optimizacion
const addSql = async(sql, data) => {
    return await db.query(sql, data);
}

const id = async(id) => {
    let sql = 'SELECT * FROM  sexo WHERE sexo_id = ?';
    sex = await addSql(sql, [id]);
    return sex;
}