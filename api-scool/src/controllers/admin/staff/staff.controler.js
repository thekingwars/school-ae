import db from '../../../db';
import { storage } from '../../../config/multer'
import multer from 'multer';
let staff;

export const uploaderFotoStaff = multer({
    storage
}).single('staff_foto')

export const createCurso = async(req, res) => {
    const {
        staff_nome,
        staff_telemovel,
        staff_lingua_nativa,
        staff_foto,
        staff_nacionalidade,
        staff_tipo_doc_ident,
        staff_num_doc_ident,
        staff_sexo
    } = req.body;

    let sql = 'INSERT INTO staff SET ?';

    const data = {
        staff_nome,
        staff_telemovel,
        staff_lingua_nativa,
        staff_foto,
        staff_nacionalidade,
        staff_tipo_doc_ident,
        staff_num_doc_ident,
        staff_sexo
    }

    if (!staff_nome ||
        !staff_telemovel ||
        !staff_lingua_nativa ||
        !staff_nacionalidade ||
        !staff_tipo_doc_ident ||
        !staff_num_doc_ident ||
        !staff_sexo
    ) {
        return res.status(400).json({ ok: false, err: 'Campos obrigatórios' });
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