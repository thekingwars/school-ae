import db from '../../../db';

let instalacoes
export const createInstalacoes = async(req, res) => {
    const { instalacoes_nome, escolas_fk } = req.body

    let sql = `INSERT INTO instalacoes SET ?`

    const data = {
        instalacoes_nome,
        escolas_fk
    }

    if (!instalacoes_nome || !escolas_fk) {
        return res.status(400).json({ ok: false, err: 'Campos obrigatórios' });
    }

    if (instalacoes_nome.length > 5) {
        return res.status(400).json({ ok: false, err: 'O nome não pode ser maior do que 5' })
    }

    instalacoes = await addSql(sql, data)

    return res.status(201).json({ ok: true, instalacoes: await id(instalacoes.insertId) });
}

export const findAllInstalacoes = async(req, res) => {
    let sql = `SELECT a1.*, b1.*
               FROM instalacoes a1 JOIN escolas b1 ON a1.escolas_fk = b1.escola_id
               ORDER BY instalacoes_id`

    instalacoes = await addSql(sql);

    return res.status(200).json({ ok: true, instalacoes });
}

export const findInstalacoes = async(req, res) => {
    const { id } = req.params;
    let sql = ` SELECT a1.instalacoes_nome, b1.*
                FROM instalacoes a1 JOIN escolas b1 ON a1.escolas_fk = b1.escola_id
                WHERE instalacoes_id = ?`;

    instalacoes = await addSql(sql, id);
    return res.status(200).json({ ok: true, instalacoes: instalacoes[0] });
}

export const updateInstalacoes = async(req, res) => {
    const { instalacoes_nome, escolas_fk } = req.body

    let sql = 'UPDATE instalacoes SET ? WHERE instalacoes_id = ?';

    const data = {
        instalacoes_nome,
        escolas_fk
    }

    if (!instalacoes_nome || !escolas_fk) {
        return res.status(400).json({ ok: false, err: 'Campos obrigatórios' });
    }

    if (instalacoes_nome.length > 5) {
        return res.status(400).json({ ok: false, err: 'O nome não pode ser maior do que 5' })
    }

    instalacoes = await addSql(sql, [data, req.params.id]);

    return res.status(201).json({ ok: true, instalacoes: await id(req.params.id) });
}

export const deleteInstalacoes = async(req, res) => {
    let sql = 'DELETE FROM instalacoes WHERE instalacoes_id = ?';
    instalacoes = await addSql(sql, req.params.id);
    return res.status(201).json({ ok: true, instalacoes: 'Instalacoes removido com êxito' });
}


const addSql = async(sql, data) => {
    return await db.query(sql, data);
}

const id = async(id) => {
    let sql = 'SELECT * FROM  instalacoes WHERE instalacoes_id = ?';
    instalacoes = await addSql(sql, [id]);
    return instalacoes;
}