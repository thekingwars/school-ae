import db from '../../../db'
import { passwordEncrypt } from '../../../utils/bcrypt'

export const createAdmin = async(req, res) => {
    const { admin_nome, admin_email, admin_password, admin_telemovel } = req.body
    const sql = 'INSERT INTO admins SET ?'
    const verifyEmail = `SELECT * FROM admins WHERE admin_email = ?`

    const email = await db.query(verifyEmail, admin_email)

    if (!admin_nome || !admin_email || !admin_password || !admin_telemovel) {
        return res.status(400).json({ ok: false, err: 'Campos Obrigatórios' })
    }

    if (admin_password.length < 6) {
        return res.status(406).json({ ok: false, err: 'A senha mínima deve ter 6 caracteres' })
    }

    if (email.length > 0) {
        if (email[0].admin_email === admin_email) {
            return res.status(406).json({ ok: false, err: 'Já existe um administrador com este e-mail' })
        }
    }

    let data = {
        admin_nome,
        admin_email,
        admin_password: passwordEncrypt(admin_password),
        admin_role: 'admin',
        admin_telemovel
    }

    const admin = await db.query(sql, data)

    return res.status(201).json({ ok: true, msg: 'administrador registado com sucesso' })
}

export const findAllAdmin = async(req, res) => {
    const sql = 'SELECT * FROM admins'

    const admins = await db.query(sql)

    return res.status(200).json({ ok: true, admins })
}

export const findAdmin = async(req, res) => {
    const sql = 'SELECT * FROM admins WHERE admin_id = ?'

    const admin = await db.query(sql, [req.params.id])

    return res.status(200).json({ ok: true, admins: admin[0] })
}

export const updateAdmin = async(req, res) => {
    try {
        const { admin_nome, admin_email, admin_role, admin_telemovel } = req.body
        const sql = 'UPDATE admins SET ? WHERE admin_id = ?'
        const verifyEmail = `SELECT * FROM admins WHERE admin_id = ?`
        const email = await db.query(verifyEmail, req.params.id)

        if (!admin_nome || !admin_email || !admin_telemovel) {
            return res.status(400).json({ ok: false, err: 'Campos Obrigatórios' })
        }

        let data = {
            admin_nome,
            admin_email,
            admin_role,
            admin_telemovel
        }

        const admin = await db.query(sql, [data, req.params.id])

        return res.status(200).json({ ok: true, admins: admin })
    } catch (err) {
        if (err.code = 'ER_DUP_ENTRY') {
            return res.status(500).json({ ok: false, err: 'Já existe um administrador com este e-mail' })
        }
    }
}

export const deleteAdmin = async(req, res) => {
    const sql = 'DELETE FROM admins WHERE admin_id = ?'

    const admin = await db.query(sql, [req.params.id])

    return res.status(200).json({ ok: true, msg: 'administrador removido com sucesso' })
}