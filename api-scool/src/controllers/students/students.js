import db from '../../db'
import { storage } from '../../config/multer'
import multer from 'multer';


export const uploader = multer({
    storage
}).single('aluno_foto')

export const getStudent = async(req, res) => {

    const { id } = req.params

    let sql = 'SELECT * FROM alunos WHERE aluno_id = ?'

    let student = await db.query(sql, id)

    return res.status(200).json({ ok: true, student: student[0] })
}

export const user = (req, res) => {
    return res.status(200).json({ ok: true, user: req.decode })
}

export const infoUserExtra = async(req, res) => {
    const { id } = req.params
    const { aluno_sexo, aluno_nacionalidade, aluno_tipo_doc_ident, aluno_num_doc_ident, aluno_data_nascimento, aluno_nif, aluno_formacao } = req.body
    const file = req.file

    if (!aluno_sexo || !aluno_nacionalidade || !aluno_tipo_doc_ident || !aluno_num_doc_ident || !aluno_data_nascimento || !aluno_nif || !aluno_formacao) {
        return res.status(401).json({ ok: false, err: 'Campos obrigatórios' })
    }

    const data = {
        aluno_sexo,
        aluno_nacionalidade,
        aluno_tipo_doc_ident,
        aluno_num_doc_ident,
        aluno_data_nascimento,
        aluno_formacao,
        aluno_nif,
        aluno_foto: !file ? null : `http://localhost:3200/${file.filename}`
    }

    let sql = 'UPDATE alunos SET ? WHERE aluno_id = ?'

    let student = await db.query(sql, [data, id])

    return res.status(200).json({ ok: true, student })
}