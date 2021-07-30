import db from '../../../db';

let equipamentos
export const createEquipamentos = async(req, res) => {
    const { equipamento_nome, equipamento_quantidade_geral, equipamento_quantidade_disponivel, salas_fk } = req.body

    let sql = `INSERT INTO equipamentos SET ?`

    const data = {
        equipamento_nome,
        equipamento_quantidade_geral,
        equipamento_quantidade_disponivel,
        salas_fk
    }

    if (!equipamento_nome || !equipamento_quantidade_disponivel || !equipamento_quantidade_geral || !salas_fk) {
        return res.status(400).json({ ok: false, err: 'Campos obrigatórios' });
    }

    equipamentos = await addSql(sql, data)

    return res.status(201).json({ ok: true, equipamentos: await id(equipamentos.insertId) });
}

export const findAllEquipamentos = async(req, res) => {
    let sql = ` SELECT a1.*, b1.*
        	    FROM equipamentos a1 JOIN salas b1 ON a1.salas_fk = b1.sala_id
                ORDER BY equipamento_id`;

    equipamentos = await addSql(sql);

    return res.status(200).json({ ok: true, equipamentos });
}

export const findEquipamentos = async(req, res) => {
    const { id } = req.params;
    let sql = ` SELECT a1.*, b1.*
                FROM equipamentos a1 JOIN salas b1 ON a1.salas_fk = b1.sala_id
                WHERE equipamento_id = ?`;

    equipamentos = await addSql(sql, id);
    return res.status(200).json({ ok: true, equipamentos: equipamentos[0] });
}

export const updateEquipamentos = async(req, res) => {
    const { equipamento_nome, equipamento_quantidade_geral, equipamento_quantidade_disponivel } = req.body
    let sql = 'UPDATE equipamentos SET ? WHERE equipamento_id = ?';
    const data = {
        equipamento_nome,
        equipamento_quantidade_geral,
        equipamento_quantidade_disponivel
    }

    if (!equipamento_nome || !equipamento_quantidade_disponivel || !equipamento_quantidade_geral) {
        return res.status(400).json({ ok: false, err: 'Campos obrigatórios' });
    }

    equipamentos = await addSql(sql, [data, req.params.id]);

    return res.status(201).json({ ok: true, equipamentos: await id(req.params.id) });
}

export const deleteEquipamentos = async(req, res) => {
    let sql = 'DELETE FROM equipamentos WHERE equipamento_id = ?';
    equipamentos = await addSql(sql, req.params.id);
    return res.status(201).json({ ok: true, equipamentos: 'Equipamento removido com êxito' });
}

//funciones de optimizacion
const addSql = async(sql, data) => {
    return await db.query(sql, data);
}

const id = async(id) => {
    let sql = 'SELECT * FROM  equipamentos WHERE equipamento_id = ?';
    equipamentos = await addSql(sql, [id]);
    return equipamentos;
}