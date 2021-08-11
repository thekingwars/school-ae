import db from '../../../db'
import { passwordEncrypt } from '../../../utils/bcrypt'

export const createAdmin = async(req, res) => {
    const { admin_nome, admin_email, admin_password, admin_telemovel } = req.body
    const sql = 'INSERT INTO admins SET ?'

    if (!admin_nome || !admin_email || !admin_password || !admin_telemovel) {
        return res.status(400).json({ ok: false, err: 'Campos Obrigatórios' })
    }


    if (admin_password.length < 6) {
        return res.status(406).json({ ok: false, err: 'A senha mínima deve ter 6 caracteres' })
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

    return res.status(200).json({ ok: true, admin: admin[0] })
}

export const updateAdmin = async(req, res) => {
    const { admin_nome, admin_email, admin_password, admin_role, admin_telemovel } = req.body

    const sql = 'UPDATE admins SET ? WHERE admin_id = ?'

    if (!admin_nome || !admin_email || !admin_password || !admin_telemovel) {
        return res.status(400).json({ ok: false, err: 'Campos Obrigatórios' })
    }

    if (admin_password.length < 6) {
        return res.status(406).json({ ok: false, err: 'A senha mínima deve ter 6 caracteres' })
    }

    let data = {
        admin_nome,
        admin_email,
        admin_password: passwordEncrypt(admin_password),
        admin_role,
        admin_telemovel
    }

    const admin = await db.query(sql, [data, req.params.id])

    return res.status(200).json({ ok: true, admin })
}

export const deleteAdmin = async(req, res) => {
    const sql = 'DELETE FROM admins WHERE admin_id = ?'

    const admin = await db.query(sql, [req.params.id])

    return res.status(200).json({ ok: true, admin })
}