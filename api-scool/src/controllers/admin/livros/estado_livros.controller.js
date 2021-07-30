import db from '../../../db';

let estado_livro;

export const createLivroEstado = async(req, res) => {
    const { estado_livro_nome } = req.body;

    let sql = 'INSERT INTO estado_livros SET ?';

    const data = {
        estado_livro_nome
    }

    if (!estado_livro_nome) {
        return res.status(400).json({ ok: false, err: 'Campos obrigatórios' });
    }

    estado_livro = await addSql(sql, data);

    return res.status(201).json({ ok: true, estado_livro: await id(estado_livro.insertId) });
}

export const findAllLivroEstado = async(req, res) => {
    let sql = 'SELECT * FROM estado_livros';

    estado_livro = await addSql(sql);

    return res.status(200).json({ ok: true, estado_livro });
}

export const findLivroEstado = async(req, res) => {
    const { id } = req.params;
    let sql = 'SELECT * FROM estado_livros WHERE estado_livro_id = ?';
    estado_livro = await addSql(sql, [id]);

    return res.status(200).json({ ok: true, estado_livro: estado_livro[0] });
}

export const updateLivroEstado = async(req, res) => {
    const { estado_livro_nome } = req.body
    let sql = 'UPDATE estado_livros SET ? WHERE estado_livro_id = ?';
    const data = {
        estado_livro_nome
    }

    if (!estado_livro_nome) {
        return res.status(400).json({ ok: false, err: 'Campos obrigatórios' });
    }

    estado_livro = await addSql(sql, [data, req.params.id]);

    return res.status(201).json({ ok: true, estado_livro: await id(req.params.id) });
}

export const deleteLivroEstado = async(req, res) => {
    let sql = 'DELETE FROM estado_livros WHERE estado_livro_id = ?';
    estado_livro = await addSql(sql, req.params.id);
    return res.status(201).json({ ok: true, estado_livro: 'Estado Livro removido com êxito' });
}

//funciones de optimizacion
const addSql = async(sql, data) => {
    return await db.query(sql, data);
}

const id = async(id) => {
    let sql = 'SELECT * FROM  estado_livros WHERE estado_livro_id = ?';
    estado_livro = await addSql(sql, [id]);
    return estado_livro;
}