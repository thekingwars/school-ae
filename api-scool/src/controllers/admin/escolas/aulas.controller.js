import db from '../../../db';

let aulas
export const createAulas = async(req, res) => {
    const { aulas_num, aulas_data, aula_hora_entrada_prevista, aula_hora_entrada, aula_hora_saida_prevista, aula_hora_saida, aula_unidade, aula_obs, salas_fk } = req.body

    let sql = `INSERT INTO aulas SET ?`

    const data = {
        aulas_num,
        aulas_data,
        aula_hora_entrada_prevista,
        aula_hora_entrada,
        aula_hora_saida_prevista,
        aula_hora_saida,
        aula_unidade,
        aula_obs,
        salas_fk
    }

    if (!aulas_num || !aulas_data || !aula_hora_entrada_prevista || !aula_hora_entrada || !aula_hora_saida_prevista || !aula_hora_saida || !aula_unidade || !salas_fk) {
        return res.status(400).json({ ok: false, err: 'Campos obrigatórios' });
    }

    aulas = await addSql(sql, data)

    return res.status(201).json({ ok: true, aulas: await id(aulas.insertId) });
}

export const findAllAulas = async(req, res) => {
    /*let sql = ` SELECT a1.*, b1.*
        	    FROM aulas a1 JOIN salas b1 ON a1.salas_fk = b1.sala_id
                ORDER BY aulas_id`;*/
    let sql = `SELECT * FROM aulas`

    aulas = await addSql(sql);

    return res.status(200).json({ ok: true, aulas });
}

export const findAulas = async(req, res) => {
    const { id } = req.params;
    /*let sql = ` SELECT a1.*, b1.*
                FROM aulas a1 JOIN salas b1 ON a1.salas_fk = b1.sala_id
                WHERE aulas_id = ?`;*/
    let sql = `SELECT * FROM aulas WHERE aulas_id = ?`
    aulas = await addSql(sql, id);
    return res.status(200).json({ ok: true, aulas: aulas[0] });
}

export const updateAulas = async(req, res) => {
    const { aulas_num, aulas_data, aula_hora_entrada_prevista, aula_hora_entrada, aula_hora_saida_prevista, aula_hora_saida, aula_unidade, aula_obs, salas_fk } = req.body

    let sql = 'UPDATE aulas SET ? WHERE aulas_id = ?';

    const data = {
        aulas_num,
        aulas_data,
        aula_hora_entrada_prevista,
        aula_hora_entrada,
        aula_hora_saida_prevista,
        aula_hora_saida,
        aula_unidade,
        aula_obs,
        salas_fk
    }

    if (!aulas_num || !aulas_data || !aula_hora_entrada_prevista || !aula_hora_entrada || !aula_hora_saida_prevista || !aula_hora_saida || !aula_unidade || !salas_fk) {
        return res.status(400).json({ ok: false, err: 'Campos obrigatórios' });
    }


    aulas = await addSql(sql, [data, req.params.id]);

    return res.status(201).json({ ok: true, aulas: await id(req.params.id) });
}

export const deleteAulas = async(req, res) => {
    let sql = 'DELETE FROM aulas WHERE aulas_id = ?';
    aulas = await addSql(sql, req.params.id);
    return res.status(201).json({ ok: true, aulas: 'Aulas removido com êxito' });
}

//funciones de optimizacion
const addSql = async(sql, data) => {
    return await db.query(sql, data);
}

const id = async(id) => {
    let sql = 'SELECT * FROM  aulas WHERE aulas_id = ?';
    aulas = await addSql(sql, [id]);
    return aulas;
}