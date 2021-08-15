import db from '../../../db';
let turma;


export const createTurma = async (req, res) => {
    const { nome_turma, data_inicio, data_fim, estado, qt_alunos, hora_inicio, hora_fin, id_professor, id_sala, id_curso } = req.body
    const sql = `INSERT INTO turma SET ?`
    const professorSql = `SELECT id_professor, nome_turma FROM turma WHERE id_professor = ?`
    const salaSql = `SELECT id_sala, nome_turma FROM turma WHERE id_sala = ?`
    const cursoSql = 'SELECT id_curso, nome_turma FROM turma WHERE id_curso = ?'
    const hora_inicioSql = `SELECT * FROM turma WHERE hora_inicio = '${hora_inicio}' AND hora_fin = '${hora_fin}'`
    const hora_finSql = `SELECT * FROM turma WHERE hora_fin = ?`

    const data = {
        nome_turma,
        data_inicio,
        data_fim,
        estado,
        qt_alunos,
        hora_fin,
        hora_inicio,
        id_professor,
        id_sala,
        id_curso,
    }

    const hora_inicioBD = await addSql(hora_inicioSql)
    const professorBD = await addSql(professorSql, id_professor)
    const salaBD = await addSql(salaSql, id_sala)
    //const cursoBD = await addSql(cursoSql, id_curso)
    const hora_finBd = await addSql(hora_finSql, hora_fin)

    console.log(hora_finBd)

    if(!nome_turma || !data_inicio || !data_fim || !estado || !qt_alunos || !hora_inicio || !hora_fin || !id_professor || !id_sala || !id_curso){
        return res.status(400).json({ ok: false, err: 'Campos obrigatórios' })
    }

   if(hora_inicioBD.length > 0){
        if(hora_inicioBD[0].hora_inicio === hora_inicio && hora_inicioBD[0].hora_fin === hora_fin){
            if(professorBD.length > 0){
                if(professorBD[0].id_professor === id_professor){
                    return res.status(400).json({ ok: false, err: `Já há um professor no turno ${professorBD[0].nome_turma}` })
                }
           }
           if(professorBD.length > 0){
                if(professorBD[0].id_professor === id_professor){
                    return res.status(400).json({ ok: false, err: `Já há um professor no turno ${professorBD[0].nome_turma}` })
                }
            }
           if(salaBD.length > 0){
                if(salaBD[0].id_sala === id_sala){
                    return res.status(400).json({ ok: false, err: `Já há uma sala no turno ${salaBD[0].nome_turma}` })
                }
            }
        }
   }


   if(hora_finBd.length > 0){
        return hora_finBd.forEach(hr => {
            if(hr.id_professor === id_professor){
                return res.status(400).json({ ok: false, err: `Já existe um professor neste horário ${hr.hora_inicio} - ${hr.hora_fin}` })
            }

            if(hr.id_sala === id_sala){
                return res.status(400).json({ ok: false, err: `Já existe uma sala neste horário ${hr.hora_inicio} - ${hr.hora_fin}` })
            }
        })
   }

    turma = await addSql(sql, data)

    return res.status(201).json({ ok: true, turma: await id(turma.insertId) });
}

//funciones de optimizacion
const addSql = async(sql, data) => {
    return await db.query(sql, data);
}

const id = async(id) => {
    let sql = 'SELECT * FROM turma WHERE id_turma = ?';
    turma = await addSql(sql, [id]);
    return turma;
}