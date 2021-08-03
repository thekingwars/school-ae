import db from '../../../db';
let programa;

export const createPrograma = async(req, res) => {
    const { programa_nome, programa_horas, programa_tempo_aula } = req.body;

    let sql = 'INSERT INTO programa SET ?';

    const data = {
        programa_nome,
        programa_horas,
        programa_tempo_aula
    }

    console.log(req.body)

    if (!programa_nome || !programa_horas || !programa_tempo_aula) {
        return res.status(400).json({ ok: false, err: 'Campos obrigatórios' });
    }

    if (programa_nome.length > 5) {
        return res.status(400).json({ ok: false, err: 'A abreviatura pode ter apenas 5 carácter' });
    }

    if (isNaN(programa_horas)) {
        return res.status(400).json({ ok: false, err: 'só são permitidos números com decimais' });
    }

    if (isNaN(programa_tempo_aula)) {
        return res.status(400).json({ ok: false, err: 'só são permitidos números com decimais' });
    }


    programa = await addSql(sql, data);

    return res.status(201).json({ ok: true, programa: await id(programa.insertId) });
}

export const findAllPrograma = async(req, res) => {
    let sql = 'SELECT * FROM programa';

    programa = await addSql(sql);

    return res.status(200).json({ ok: true, programa: programa });
}

export const findPrograma = async(req, res) => {
    const { id } = req.params;
    let sql = 'SELECT * FROM programa WHERE programa_id = ?';
    programa = await addSql(sql, [id]);
    return res.status(200).json({ ok: true, programa: programa[0] });
}

export const updatePrograma = async(req, res) => {
    let sql = 'UPDATE programa SET ? WHERE programa_id = ?';
    const { programa_nome, programa_horas, programa_tempo_aula } = req.body;
    const data = {
        programa_nome,
        programa_horas,
        programa_tempo_aula
    }

    if (!programa_nome || !programa_horas || !programa_tempo_aula) {
        return res.status(400).json({ ok: false, err: 'Campos obrigatórios' });
    }

    if (programa_nome.length > 5) {
        return res.status(400).json({ ok: false, err: 'A abreviatura pode ter apenas 5 carácter' });
    }
    if (isNaN(programa_horas)) {
        return res.status(400).json({ ok: false, err: 'só são permitidos números com decimais' });
    }

    if (isNaN(programa_tempo_aula)) {
        return res.status(400).json({ ok: false, err: 'só são permitidos números com decimais' });
    }


    programa = await addSql(sql, [data, req.params.id]);

    return res.status(201).json({ ok: true, programa: await id(req.params.id) });
}

export const deletePrograma = async(req, res) => {
    let sql = 'DELETE FROM programa WHERE programa_id = ?';
    programa = await addSql(sql, req.params.id);
    return res.status(201).json({ ok: true, programa: 'Programa eliminada com sucesso' });
}

//funciones de optimizacion
const addSql = async(sql, data) => {
    return await db.query(sql, data);
}

const id = async(id) => {
    let sql = 'SELECT * FROM programa WHERE programa_id = ?';
    programa = await addSql(sql, [id]);
    return programa;
}