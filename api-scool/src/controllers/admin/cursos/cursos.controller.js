import db from '../../../db';
let curso;

export const createCurso = async(req, res) => {
    const {
        curso_valor_matricula,
        curso_valor,
        gr_etario,
        nivel,
        area,
        tipo,
        modelo,
        modalidade,
        horario,
        tempo_aula,
        Frequencia,
        Duracao,
        programa_fk,
        instalacoes_fk,
        lingua
    } = req.body;

    let sql = 'INSERT INTO cursos SET ?';

    const data = {
        curso_valor_matricula,
        curso_valor,
        gr_etario,
        nivel,
        area,
        tipo,
        modelo,
        modalidade,
        horario,
        tempo_aula,
        Frequencia,
        Duracao,
        programa_fk,
        instalacoes_fk,
        lingua
    }

    if (!curso_valor_matricula ||
        !curso_valor ||
        !gr_etario ||
        !nivel ||
        !area ||
        !tipo ||
        !modelo ||
        !modalidade ||
        !horario ||
        !tempo_aula ||
        !Frequencia ||
        !Duracao ||
        !programa_fk ||
        !instalacoes_fk ||
        !lingua
    ) {
        return res.status(400).json({ ok: false, err: 'Campos obrigatórios' });
    }

    if (area.length > 5 || tipo.length > 5 || modelo.length > 5 || modalidade.length > 5) {
        return res.status(400).json({ ok: false, err: 'A abreviatura pode ter apenas 5 carácter' });
    }


    curso = await addSql(sql, data);

    return res.status(201).json({ ok: true, curso: await id(curso.insertId) });
}

export const findAllCursos = async(req, res) => {
    let sql = `SELECT * FROM cursos`

    curso = await addSql(sql);

    return res.status(200).json({ ok: true, curso: curso });
}

export const findCurso = async(req, res) => {
    const { id } = req.params;
    let sql = 'SELECT * FROM cursos WHERE curso_id = ?';
    curso = await addSql(sql, [id]);
    return res.status(200).json({ ok: true, curso: curso[0] });
}

export const updateCurso = async(req, res) => {
    let sql = 'UPDATE cursos SET ? WHERE curso_id = ?';
    const {
        curso_valor_matricula,
        curso_valor,
        gr_etario,
        nivel,
        area,
        tipo,
        modelo,
        modalidade,
        horario,
        tempo_aula,
        Frequencia,
        Duracao,
        programa_fk,
        instalacoes_fk,
        lingua_fk
    } = req.body;

    const data = {
        curso_valor_matricula,
        curso_valor,
        gr_etario,
        nivel,
        area,
        tipo,
        modelo,
        modalidade,
        horario,
        tempo_aula,
        Frequencia,
        Duracao,
        programa_fk,
        instalacoes_fk,
        lingua_fk
    }

    if (!curso_valor_matricula ||
        !curso_valor ||
        !gr_etario ||
        !nivel ||
        !area ||
        !tipo ||
        !modelo ||
        !modalidade ||
        !horario ||
        !tempo_aula ||
        !Frequencia ||
        !Duracao ||
        !programa_fk ||
        !instalacoes_fk ||
        !lingua_fk
    ) {
        return res.status(400).json({ ok: false, err: 'Campos obrigatórios' });
    }

    if (area.length > 5 || tipo.length > 5 || modelo.length > 5 || modalidade.length > 5) {
        return res.status(400).json({ ok: false, err: 'A abreviatura pode ter apenas 5 carácter' });
    }

    curso = await addSql(sql, [data, req.params.id]);

    return res.status(201).json({ ok: true, curso: await id(req.params.id) });
}

export const deleteCurso = async(req, res) => {
    let sql = 'DELETE FROM cursos WHERE curso_id = ?';
    curso = await addSql(sql, req.params.id);
    return res.status(201).json({ ok: true, curso: 'Curso eliminada com sucesso' });
}

//funciones de optimizacion
const addSql = async(sql, data) => {
    return await db.query(sql, data);
}

const id = async(id) => {
    let sql = 'SELECT * FROM cursos WHERE curso_id = ?';
    curso = await addSql(sql, [id]);
    return curso;
}