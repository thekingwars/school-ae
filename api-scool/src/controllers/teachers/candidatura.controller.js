import multer from "multer"
import db from '../../db'
import { storage } from '../../config/multer'
import fs from 'fs'


export const professorCV = multer({
    storage
}).single('professor_cv')

export const candidatura = async(req, res) => {
    let { professor_lingua_nativa } = req.body
    let sql = 'UPDATE professores SET ? WHERE professor_id = ?'
    let file = req.file

    if (!professor_lingua_nativa || !file) {
        return res.status(400).json({ ok: false, err: 'Campos Obrigatórios' })
    }

    if (req.file.mimetype !== 'application/pdf') {
        fs.unlinkSync(req.file.path)
        return res.status(406).json({ ok: false, err: 'Só são aceites PDFs' })
    }

    let data = {
        professor_lingua_nativa,
        professor_cv: `http://dev.servebbs.net:3200/${file.filename}`
    }

    const professor = await db.query(sql, [data, req.params.id])

    return res.status(200).json({
        ok: true,
        professor,
        msg: 'Se tiver enviado com sucesso o seu CV e informações, será notificado por correio se tiver sido seleccionado ou não.'
    })
}