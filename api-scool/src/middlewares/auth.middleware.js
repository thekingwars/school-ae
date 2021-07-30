import jwt from 'jsonwebtoken'
import db from '../db'


export const notToken = (req, res, next) => {
    if (!req.headers.authorization) {
        res.status(401).json({ msg: "Acceso no autorizado" })
    } else {
        let token = req.headers.authorization.split(" ")[1]

        console.log(token)

        jwt.verify(token, 'mySecretKey', (err, decode) => {
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
    let sql = `SELECT a1.fk_UserID, b1.ID, b1.valEmail, b1.valTelf
                FROM alunos a1 JOIN valida b1 ON a1.fk_UserID = b1.ID 
                WHERE a1.aluno_id = ?`

    const fk = await db.query(sql, req.decode.id)

    if (fk.length === 0) {
        res.status(400).json({ msg: "Error con el usuario" })
    } else {
        if (fk[0].valEmail == false && fk[0].valTelf == false) {
            res.status(401).json({ msg: "Acceso no autorizado, debes validar tu correo y telefono" })
        } else {
            next();
        }
    }
}

export const verifyCodeEmail = async(req, res, next) => {
    let sql = ` SELECT a1.fk_UserID, b1.ID, b1.valEmail
                FROM professores a1 JOIN valida b1 ON a1.fk_UserID = b1.ID 
                WHERE a1.professor_id = ?`

    const fk = await db.query(sql, req.decode.id)

    if (fk.length === 0) {
        res.status(400).json({ msg: "Error con el usuario" })
    } else {
        if (fk[0].valEmail == false) {
            res.status(401).json({ msg: "Acceso no autorizado, debes validar tu correo" })
        } else {
            next();
        }
    }
}