import db from '../../../db';
import multer from 'multer'
import { storage } from '../../../config/multer'

let salas

export const uploaderSala = multer({
    storage
}).single('sala_foto')


export const createSalas = async(req, res) => {
    const { sala_nome, sala_capacidade_aconselhada, sala_capacidade_maxima, sala_equipamento_quantidade, escolas_fk } = req.body
    const file = req.file
    let sql = `INSERT INTO salas SET ?`
    let salaUnique = `SELECT * from salas WHERE sala_nome = ?`

    const salaTable = await addSql(salaUnique, sala_nome)

    if (salaTable.length > 0) {
        if (salaTable[0].sala_nome === sala_nome) {
            return res.status(406).json({ ok: false, err: 'O nome é único, não pode ser repetido' });
        }
    }

    if (!sala_nome || !sala_capacidade_aconselhada || !sala_capacidade_maxima || !sala_equipamento_quantidade || !file || !escolas_fk) {
        return res.status(400).json({ ok: false, err: 'Campos obrigatórios' });
    }
    const data = {
        sala_nome,
        sala_capacidade_aconselhada,
        sala_capacidade_maxima,
        sala_equipamento_quantidade,
        sala_foto: `http://dev.servebbs.net:3200/${file.filename}`,
        escolas_fk
    }

    salas = await addSql(sql, data)

    return res.status(201).json({ ok: true, salas: await id(salas.insertId) });
}

export const findAllSalas = async(req, res) => {
    let sql = `SELECT a1.*, b1.*
               FROM salas a1 JOIN escolas b1 ON a1.escolas_fk = b1.escola_id
               ORDER BY sala_id`

    salas = await addSql(sql);

    return res.status(200).json({ ok: true, salas });
}

export const findSalas = async(req, res) => {
    const { id } = req.params;
    let sql = ` SELECT a1.*, b1.*
                FROM salas a1 JOIN escolas b1 ON a1.escolas_fk = b1.escola_id
                WHERE sala_id = ?`;

    salas = await addSql(sql, id);
    return res.status(200).json({ ok: true, salas: salas[0] });
}

export const updateSalas = async(req, res) => {
    const { sala_nome, sala_capacidade_aconselhada, sala_capacidade_maxima, sala_equipamento_quantidade, escolas_fk } = req.body

    let sql = 'UPDATE salas SET ? WHERE sala_id = ?';
    let sql2 = `SELECT sala_foto FROM salas WHERE sala_id = ?`
    const file = req.file
    let foto
    const sala_fotoTable = await db.query(sql2, req.params.id)

    if (!file) {
        foto = sala_fotoTable[0].sala_foto
    } else {
        foto = `http://dev.servebbs.net:3200/${file.filename}`
    }

    const data = {
        sala_nome,
        sala_capacidade_aconselhada,
        sala_capacidade_maxima,
        sala_equipamento_quantidade,
        sala_foto: foto,
        escolas_fk
    }


    if (!sala_nome || !sala_capacidade_aconselhada || !sala_capacidade_maxima || !sala_equipamento_quantidade || !escolas_fk) {
        return res.status(400).json({ ok: false, err: 'Campos obrigatórios' });
    }

    salas = await addSql(sql, [data, req.params.id]);

    return res.status(201).json({ ok: true, salas: await id(req.params.id) });
}

export const deleteSalas = async(req, res) => {
    let sql = 'DELETE FROM salas WHERE sala_id = ?';
    salas = await addSql(sql, req.params.id);
    return res.status(201).json({ ok: true, salas: 'Salas removido com êxito' });
}

const addSql = async(sql, data) => {
    return await db.query(sql, data);
}

const id = async(id) => {
    let sql = 'SELECT * FROM  salas WHERE sala_id = ?';
    salas = await addSql(sql, [id]);
    return salas;
}