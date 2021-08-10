import jwt from 'jsonwebtoken'
import { keys } from '../config/configs'
import db from '../db'


export const notToken = (req, res, next) => {
    if (!req.headers.authorization) {
        res.status(401).json({ err: "Acceso no autorizado" })
    } else {
        let token = req.headers.authorization.split(" ")[1]

        jwt.verify(token, keys.JWT_SECRET_KEY, (err, decode) => {
            if (err) {
                res.status(500).json({ err: 'Token invalido' })
            } else {
                req.decode = decode
                next();
            }
        })
    }
}


export const verifyCode = async(req, res, next) => {

    const { aluno_email } = req.body

    let sql = `SELECT a1.fk_UserID, b1.ID, b1.valEmail, b1.valTelf
                FROM alunos a1 JOIN valida b1 ON a1.fk_UserID = b1.ID 
                WHERE a1.aluno_email = ?`

    const fk = await db.query(sql, aluno_email)

    console.log(fk)

    if (fk.length === 0) {
        res.status(400).json({ err: "correio inexistente, por favor registe-se" })
    } else {
        if (fk[0].valEmail == null && fk[0].valTelf == null) {
            res.status(406).json({ err: "Acesso não autorizado, deve validar o seu e-mail e número de telefone." })
        } else {
            next();
        }
    }
}

export const verifyCodeEmail = async(req, res, next) => {

    const { professores_email } = req.body

    let sql = ` SELECT a1.fk_UserID, b1.ID, b1.valEmail, b1.valTelf
                FROM professores a1 JOIN valida b1 ON a1.fk_UserID = b1.ID 
                WHERE a1.professores_email = ?`

    const fk = await db.query(sql, professores_email)

    if (fk.length === 0) {
        res.status(400).json({ err: "correio inexistente, por favor registe-seo" })
    } else {
        if (fk[0].valEmail == false && fk[0].valTelf == false) {
            res.status(401).json({ err: "Acesso não autorizado, deve validar o seu e-mail e número de telefone." })
        } else {
            next();
        }
    }
}