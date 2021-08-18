import db from '../../../db';
import jwt from 'jsonwebtoken'
import { keys } from '../../../config/configs';
import { comparePassword } from '../../../utils/bcrypt'

export const loginAdmin = async(req, res) => {
    const { admin_email, admin_password } = req.body
    let sql = `SELECT * FROM admins WHERE admin_email = ?`

    if (!admin_email || !admin_password) {
        return res.status(400).json({ ok: false, err: 'Campos Obrigatórios' })
    }

    if (admin_password.length < 6) {
        return res.status(400).json({ ok: false, err: 'A palavra-passe deve ter um mínimo de 6 caracteres' })
    }

    const admin = await db.query(sql, admin_email)


    if (admin.length === 0) {
        return res.status(400).json({ ok: false, err: 'O e-mail não existe para este administrador' })
    } else {

        if (admin[0].admin_password !== admin_password) {
            return res.status(400).json({ ok: false, err: 'Senha incorrecta' })
        } else if (admin[0].admin_password === admin_password) {
            let token = jwt.sign({ id: admin[0].admin_id, user: admin[0] }, keys.JWT_SECRET_KEY, {
                expiresIn: keys.JWT_EXPIRE_IN
            })
            return res.status(201).json({ ok: true, token, admin: admin[0] })
        }

        if (comparePassword(admin_password, admin[0].admin_password)) {
            let token = jwt.sign({ id: admin[0].admin_id, user: admin[0] }, keys.JWT_SECRET_KEY, {
                expiresIn: keys.JWT_EXPIRE_IN
            })
            return res.status(201).json({ ok: true, token, admin: admin[0] })
        } else {
            return res.status(401).json({ ok: 'false', err: 'Senha incorrecta' })
        }
    }

}