import db from '../../db'
import jwt from 'jsonwebtoken'
import { passwordEncrypt, comparePassword } from '../../utils/bcrypt'
import { transporter } from '../../config/nodemailer'
import { v4 as uuidv4 } from 'uuid'

export const registerTeachers = async(req, res) => {
    const { professor_nome, professor_telemovel, professor_habilitacao, professor_formacao, professores_email, professores_password } = req.body
    let verifyEmail = 'SELECT * FROM professores WHERE professores_email = ?'
    let sql = 'INSERT INTO professores SET ?'
    let numeroAleatorio = Math.floor((Math.random() * (99999 - 0 + 1)) + 99999)
    let fk_UserID = uuidv4()
    let data = {
        professor_nome,
        professor_telemovel,
        professor_habilitacao,
        professor_formacao,
        professores_email,
        professores_password: passwordEncrypt(professores_password),
        fk_UserID,
        professores_role: 'professore'
    }

    if (!professor_nome || !professor_telemovel || !professor_habilitacao || !professor_formacao || !professores_email || !professores_password) {
        return res.status(400).json({ ok: false, err: 'Campos obrigatórios' })
    }

    if (professores_password.length < 6) {
        return res.status(406).json({ ok: false, err: 'A senha mínima deve ter 6 caracteres' })
    }

    let emailTable = await db.query(verifyEmail, professores_email)

    if (emailTable.length > 0) {
        if (emailTable[0].professores_email === professores_email) {
            return res.status(406).json({ ok: false, err: 'correio existente' });
        }
    }

    let validaTable = `INSERT INTO valida (ID, EmailCode) VALUES ('${fk_UserID}', '${numeroAleatorio}')`

    await db.query(validaTable)

    const teachers = await db.query(sql, data)

    })

    await transporter.sendMail({
        from: '"Fred Foo 👻" <carlosguerra2001.2@gmail.com>', // sender address
        to: professores_email, // list of receivers
        subject: "Hello ✔", // Subject line
        html: `Verificar o número de correio ${numeroAleatorio}`
    });

    return res.status(201).json({ ok: true, token, msg: 'Foi enviado um código de verificação para o seu e-mail e número de telefone.' })
}

export const loginTeachers = async(req, res) => {
    const { professores_email, professores_password } = req.body
    let verifyEmail = 'SELECT * FROM professores WHERE professores_email = ?'

    const professor_email = await db.query(verifyEmail, professores_email)

    if (professor_email.length === 0) {
        return res.status(400).json({ ok: 'false', err: 'correio inexistente, por favor registe-se' });
    } else {
        if (comparePassword(professores_password, professor_email[0].professores_password)) {
            let token = jwt.sign({ id: professor_email[0].professor_id, user: professor_email[0] }, keys.JWT_SECRET_KEY, {
                expiresIn: keys.JWT_EXPIRE_IN
            })
            return res.status(201).json({ ok: true, token, professor: professor_email[0] })
        } else {
            return res.status(401).json({ ok: 'false', err: 'Senha incorrecta' })
        }
    }
}

export const forgoutPasswordTeachers = async(req, res) => {
    const { professores_email } = req.body
    let sql = 'SELECT * FROM professores WHERE professores_email = ?'


    if (!professores_email) {
        return res.status(400).json({ ok: 'false', err: 'O correio é necessário' })
    }

    const email = await db.query(sql, professores_email)

    if (email.length === 0) {
        return res.status(400).json({ ok: 'false', err: 'correio inexistente, por favor registe-se' });
    } else {
        let token = jwt.sign({ user: email[0].professor_id }, keys.JWT_SECRET_KEY, {
            expiresIn: '5min'
        })

        let direcction = `localhost:4200/teachers/new-password/${token}`

        // send mail with defined transport object
        await transporter.sendMail({
            from: '"Fred Foo 👻" <carlosguerra2001.2@gmail.com>', // sender address
            to: email[0].professores_email, // list of receivers
            subject: "Hello ✔", // Subject line
            html: `
                <b>Hello world?</b> 
  
                <br> 
  
                <a href="${direcction}" target="_blank">${direcction}</a>
            `, // html body
        });

        return res.status(201).json({ ok: true, token, msg: 'Foi enviado um e-mail' })
    }
}

export const recoverPasswordTeachers = async(req, res) => {
    let { token } = req.params
    const { newPassword, repeatPassword } = req.body

    let sql = 'UPDATE professores set ? WHERE professor_id = ?'

    if (!repeatPassword || !newPassword) {
        return res.status(400).json({ ok: false, err: 'Campos obrigatórios' });
    }

    if (repeatPassword !== newPassword) {
        return res.status(400).json({ ok: false, err: 'As palavras-passe não coincidem' });
    }

    let newEncryptPassword = passwordEncrypt(newPassword)

    let data = {
        professores_password: newEncryptPassword
    }


    jwt.verify(token, 'mySecretKey', async(err, decode) => {
        if (err) {
            res.status(500).json({ err: 'Ficha inválida ou expirada, por favor peça uma nova alteração de senha.' })
        } else {
            const password = await db.query(sql, [data, decode.user])

            return res.status(201).json({ ok: true, msg: 'Senha actualizada com sucesso', password })
        }
    })
}