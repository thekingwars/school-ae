import db from '../../../db';
import jwt from 'jsonwebtoken'

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

        if (admin_password !== admin[0].admin_password) {
            return res.status(400).json({ ok: false, err: 'senha incorrecta' })
        }

        let token = jwt.sign({ id: admin[0].admin_id, user: admin[0] }, 'mySecretKey', {
            expiresIn: 43200
        })
        return res.status(201).json({ ok: true, token, admin: admin[0] })
    }

}