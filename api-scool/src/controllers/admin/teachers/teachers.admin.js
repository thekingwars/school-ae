import db from '../../../db'

export const candidaturaVerify = async(req, res) => {
    let { confirm } = req.body
    const sql = 'UPDATE professores SET ? WHERE professor_id = ?'

    if (confirm === 'si'.toLowerCase()) {
        confirm = true
    } else {
        confirm = false
    }

    if (!confirm) {
        return res.status(400).json({ ok: false, err: 'Campos Obrigatórios' })
    }

    let data = {
        professore_verificado: confirm
    }


    const professor = await db.query(sql, [data, req.params.id])

    return res.status(200).json({
        ok: true,
        professor,
        msg: 'A candidatura de professor foi aceite com sucesso.'
    })
}

export const allCandidatura = async(req, res) => {
    const sql = 'SELECT professore_verificado, professor_id, professor_cv, professor_lingua_nativa FROM professores'

    const professor = await db.query(sql)

    console.log(professor)

    return res.status(200).json({ ok: true, professor });
}