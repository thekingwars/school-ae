import db from '../../../db';
import { storage } from '../../../config/multer'
import multer from 'multer';


export const uploaderEscolaCoordeandor = multer({
    storage
}).single('escola_coordenador_foto')

let escolas

export const createEscolas = async(req, res) => {
    const {
        escola_nif,
        escola_nome,
        escola_rua,
        escola_codigo_postal,
        escola_freguesia,
        escola_concelho,
        escola_data_nascimento,
        escola_telemovel
    } = req.body

    let sql = `INSERT INTO escolas SET ?`
    let nome_noRepeat = `SELECT escola_nome FROM escolas WHERE escola_nome = ?`
    let nif_noRepeat = `SELECT escola_nif FROM escolas WHERE escola_nif = ?`
    const file = req.file

    if (!escola_nif ||
        !escola_nome ||
        !escola_rua ||
        !escola_codigo_postal ||
        !escola_freguesia ||
        !escola_concelho ||
        !escola_data_nascimento ||
        !escola_telemovel ||
        !file) {
        return res.status(400).json({ ok: false, err: 'Campos obrigatórios' });
    }

    console.log(file)

    const data = {
        escola_nif,
        escola_nome,
        escola_rua,
        escola_codigo_postal,
        escola_freguesia,
        escola_concelho,
        escola_data_nascimento,
        escola_telemovel,
        escola_coordenador_foto: `http://dev.servebbs.net:3200/${file.filename}`,
    }

    const escolaTable = await db.query(nome_noRepeat, escola_nome)
    const escolanifTable = await db.query(nif_noRepeat, escola_nif)

    if (escolaTable.length > 0) {
        if (escolaTable[0].escola_nome === escola_nome) {
            return res.status(406).json({ ok: false, err: 'O nome é único, não pode ser repetido' });
        }
    }

    if (escolanifTable.length > 0) {
        if (escolanifTable[0].escola_nif == escola_nif) {
            return res.status(406).json({ ok: false, err: 'O nif é único, não pode ser repetido.' });
        }
    }

    escolas = await addSql(sql, data)

    return res.status(201).json({ ok: true, escolas: await id(escolas.insertId) });
}

export const findAllEscolas = async(req, res) => {
    let sql = 'SELECT * FROM escolas';

    escolas = await addSql(sql);

    return res.status(200).json({ ok: true, escolas });
}

export const findEscolas = async(req, res) => {
    const { id } = req.params
    let sql = 'SELECT * FROM escolas WHERE escola_id = ?'

    escolas = await addSql(sql, id)
    return res.status(200).json({ ok: true, escolas: escolas[0] })
}

export const updateEscolas = async(req, res) => {
    const {
        escola_rua,
        escola_freguesia,
        escola_data_nascimento,
        escola_telemovel
    } = req.body

    let sql = 'UPDATE escolas SET ? WHERE escola_id = ?'
    let sql2 = `SELECT escola_coordenador_foto FROM escolas WHERE escola_id = ?`
    const file = req.file
    let foto
    const sala_fotoTable = await db.query(sql2, req.params.id)

    console.log(sala_fotoTable[0].escola_coordenador_foto)

    if (!file) {
        foto = sala_fotoTable[0].escola_coordenador_foto
    } else {
        foto = `http://dev.servebbs.net:3200/${file.filename}`
    }

    console.log(file)

    const data = {
        escola_rua,
        escola_freguesia,
        escola_data_nascimento,
        escola_telemovel,
        escola_coordenador_foto: foto
    }

    if (!escola_rua ||
        !escola_freguesia ||
        !escola_data_nascimento ||
        !escola_telemovel) {
        return res.status(400).json({ ok: false, err: 'Campos obrigatórios' });
    }


    escolas = await addSql(sql, [data, req.params.id]);

    return res.status(201).json({ ok: true, escolas: await id(req.params.id) });
}

export const deleteEscolas = async(req, res) => {
    let sql = 'DELETE FROM escolas WHERE escola_id = ?';
    escolas = await addSql(sql, req.params.id);
    return res.status(201).json({ ok: true, escolas: 'Escolas removido com êxito' });
}

const addSql = async(sql, data) => {
    return await db.query(sql, data);
}

const id = async(id) => {
    let sql = 'SELECT * FROM  escolas WHERE escola_id = ?';
    escolas = await addSql(sql, [id]);
    return escolas;
}