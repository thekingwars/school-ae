import db from '../../../db';
import { storage } from '../../../config/multer'
import { passwordEncrypt } from '../../../utils/bcrypt'
import multer from 'multer';
let staff;

export const uploaderFotoStaff = multer({
    storage
}).single('staff_foto')

export const createStaff = async(req, res) => {
    const {
        staff_nome,
        staff_telemovel,
        staff_habilitacao,
        staff_email,
        staff_password,
        staff_codigo_postal,
        staff_freguesia,
        staff_concelho,
        staff_nacionalidade
    } = req.body;

    let sql = 'INSERT INTO staff SET ?';
    let file = req.file

    if (!staff_nome || !staff_telemovel || !staff_habilitacao || !staff_email || !staff_password || !staff_codigo_postal || !staff_freguesia || !staff_concelho || !staff_nacionalidade) {
        return res.status(400).json({ ok: false, err: 'Campos obrigatórios' });
    }

    const data = {
        staff_nome,
        staff_telemovel,
        staff_habilitacao,
        staff_email,
        staff_password: passwordEncrypt(staff_password),
        staff_codigo_postal,
        staff_freguesia,
        staff_concelho,
        staff_nacionalidade,
        staff_foto: file ? `http://localhost:3200/${file.filename}` : null
    }

    staff = await addSql(sql, data);

    return res.status(201).json({ ok: true, staff: await id(staff.insertId) });
}

//funciones de optimizacion
const addSql = async(sql, data) => {
    return await db.query(sql, data);
}

const id = async(id) => {
    let sql = 'SELECT * FROM staff WHERE staff_id = ?';
    staff = await addSql(sql, [id]);
    return staff;
}