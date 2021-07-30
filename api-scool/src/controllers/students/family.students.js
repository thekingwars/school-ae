import db from '../../db'

export const dadInformation = async(req, res) => {
    const { aluno_pai_nome, aluno_pai_contacto, aluno_pai_email, aluno_pai_habilitacao, aluno_pai_formacao, aluno_pai_profissao } = req.body
    const { id } = req.params
    let query = `UPDATE alunos SET ? WHERE aluno_id = ?`
    let verifyEmail = 'SELECT * FROM alunos WHERE aluno_email = ?'
    const student_email = await db.query(verifyEmail, aluno_pai_email)
    let data = {
        aluno_pai_nome,
        aluno_pai_contacto,
        aluno_pai_email,
        aluno_pai_habilitacao,
        aluno_pai_formacao,
        aluno_pai_profissao
    }

    if (student_email.length > 0) {
        if (student_email[0].aluno_email === aluno_pai_email) {
            return res.status(400).json({ ok: 'false', err: 'Este e-mail está registado para um estudante, por favor introduza um endereço de e-mail adequado.' });
        }
    }

    if (!aluno_pai_nome || !aluno_pai_email || !aluno_pai_contacto || !aluno_pai_habilitacao || !aluno_pai_profissao || !aluno_pai_formacao) {
        return res.status(400).json({ ok: false, err: 'Campos Obrigatórios' })
    }

    let dad = await db.query(query, [data, id])


    return res.status(201).json({ ok: true, student: dad })
}

export const momInformation = async(req, res) => {
    const { aluno_mae_nome, aluno_mae_contacto, aluno_mae_email, aluno_mae_habilitacao, aluno_mae_formacao, aluno_mae_profissao } = req.body
    const { id } = req.params
    let query = `UPDATE alunos SET ? WHERE aluno_id = ?`
    let verifyEmail = 'SELECT * FROM alunos WHERE aluno_email = ?'
    const student_email = await db.query(verifyEmail, aluno_mae_email)
    let data = {
        aluno_mae_nome,
        aluno_mae_contacto,
        aluno_mae_email,
        aluno_mae_habilitacao,
        aluno_mae_formacao,
        aluno_mae_profissao
    }

    if (student_email.length > 0) {
        if (student_email[0].aluno_email === aluno_mae_email) {
            return res.status(400).json({ ok: 'false', err: 'Este e-mail está registado para um estudante, por favor introduza um endereço de e-mail adequado.' });
        }
    }

    if (!aluno_mae_nome || !aluno_mae_contacto || !aluno_mae_email || !aluno_mae_habilitacao || !aluno_mae_formacao || !aluno_mae_profissao) {
        return res.status(400).json({ ok: false, err: 'Campos Obrigatórios' })
    }


    let mom = await db.query(query, [data, id])

    return res.status(201).json({ ok: true, student: mom })
}