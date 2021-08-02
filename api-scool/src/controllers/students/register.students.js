import db from '../../db'
import jwt from 'jsonwebtoken'
import { passwordEncrypt, comparePassword } from '../../utils/bcrypt'
import { transporter } from '../../config/nodemailer'
import { clientPlivo } from '../../utils/plivo'
import { v4 as uuidv4 } from 'uuid'
import { keys } from '../../config/configs'

export const register = async(req, res) => {
    const { aluno_nome, aluno_telemovel, aluno_habilitacao, aluno_formacao, aluno_email, aluno_password, aluno_idad } = req.body
    let verifyEmail = 'SELECT * FROM alunos WHERE aluno_email = ?'
    let sql = 'INSERT INTO alunos SET ?'
    let numeroAleatorio = Math.floor((Math.random() * (99999 - 0 + 1)) + 99999)
    let numeroAleatorio2 = Math.floor((Math.random() * (99999 - 0 + 1)) + 99999)
    let fk_UserID = uuidv4()
    let data = {
        aluno_nome,
        aluno_telemovel,
        aluno_habilitacao,
        aluno_formacao,
        aluno_email,
        aluno_password: passwordEncrypt(aluno_password),
        aluno_idad,
        fk_UserID,
        aluno_role: 'aluno'
    }

    if (!aluno_nome || !aluno_telemovel || !aluno_habilitacao || !aluno_formacao || !aluno_email || !aluno_password || !aluno_idad) {
        return res.status(400).json({ ok: false, err: 'Campos obrigatórios' })
    }

    if (aluno_password.length < 6) {
        return res.status(406).json({ ok: false, err: 'A senha mínima deve ter 6 caracteres' })
    }

    let emailTable = await db.query(verifyEmail, aluno_email)

    if (emailTable.length > 0) {
        if (emailTable[0].aluno_email === aluno_email) {
            return res.status(406).json({ ok: false, err: 'correio existente' });
        }
    }

    let validaTable = `INSERT INTO valida (ID, EmailCode, PhoneCode) VALUES ('${fk_UserID}', '${numeroAleatorio}', '${numeroAleatorio2}')`

    await db.query(validaTable)

    const student = await db.query(sql, data)

    })

    await transporter.sendMail({
        from: '"School App👻" <carlosguerra2001.2@gmail.com>', // sender address
        to: aluno_email, // list of receivers
        subject: "Hello ✔", // Subject line
        html: `Verificar o número de correio ${numeroAleatorio}`
    });

    clientPlivo('SCHOOL', `${aluno_telemovel}`, `O seu código de verificação sms é: ${numeroAleatorio2}`)

    return res.status(201).json({ ok: true, token, msg: 'Foi enviado um código de verificação para o seu e-mail e número de telefone.' })
}

export const login = async(req, res) => {
    const { aluno_email, aluno_password } = req.body
    let verifyEmail = 'SELECT * FROM alunos WHERE aluno_email = ?'

    const student_email = await db.query(verifyEmail, aluno_email)

    if (student_email.length === 0) {
        return res.status(400).json({ ok: 'false', err: 'correio inexistente, por favor registe-se' });
    } else {
        if (comparePassword(aluno_password, student_email[0].aluno_password)) {
            let token = jwt.sign({ id: student_email[0].aluno_id, user: student_email[0] }, keys.JWT_SECRET_KEY, {
                expiresIn: keys.JWT_EXPIRE_IN
            })
            return res.status(201).json({ ok: true, token, student: student_email[0] })
        } else {
            return res.status(401).json({ ok: 'false', err: 'Senha incorrecta' })
        }
    }
}

export const verifyEmail = async(req, res) => {
    const { EmailCode } = req.body

    if (!EmailCode) {
        return res.status(400).json({ ok: false, err: 'Campos obrigatórios' })
    }

    let sql = 'SELECT * FROM valida WHERE EmailCode = ?'

    const codeEmail = await db.query(sql, EmailCode)

    if (codeEmail.length === 0) {
        return res.status(400).json({ ok: 'false', err: 'Não recebeu nenhum correio' });
    } else {
        if (codeEmail[0].EmailCode) {
            let sql2 = `UPDATE valida set valEmail = '1' WHERE EmailCode = ?`

            const verify = await db.query(sql2, EmailCode)

            return res.status(201).json({ ok: true, verify, mgs: 'Correio verificado com sucesso' })
        }
    }
}

export const verifyPhone = async(req, res) => {
    const { PhoneCode } = req.body

    if (!PhoneCode) {
        return res.status(400).json({ ok: false, err: 'Campos obrigatórios' })
    }

    let sql = 'SELECT * FROM valida WHERE PhoneCode = ?'

    const codePhone = await db.query(sql, PhoneCode)

    if (codePhone.length === 0) {
        return res.status(400).json({ ok: 'false', err: 'Não recebeu nenhuma mensagem' });
    } else {
        if (codePhone[0].PhoneCode) {
            let sql2 = `UPDATE valida set valTelf = '1' WHERE PhoneCode = ?`

            const verify = await db.query(sql2, PhoneCode)

            return res.status(201).json({ ok: true, verify, mgs: 'Telefone verificado com Exito' })
        }
    }
}

export const forgoutPassword = async(req, res) => {
    const { aluno_email } = req.body
    let sql = 'SELECT * FROM alunos WHERE aluno_email = ?'


    if (!aluno_email) {
        return res.status(400).json({ ok: 'false', err: 'O correio é necessário' })
    }

    const email = await db.query(sql, aluno_email)

    if (email.length === 0) {
        return res.status(400).json({ ok: 'false', err: 'correio inexistente, por favor registe-se' });
    } else {
        let token = jwt.sign({ user: email[0].aluno_id }, keys.JWT_SECRET_KEY, {
            expiresIn: '5min'
        })

        let direcction = `localhost:4200/students/new-password/${token}`

        // send mail with defined transport object
        await transporter.sendMail({
            from: '"School App👻" <carlosguerra2001.2@gmail.com>', // sender address
            to: email[0].aluno_email, // list of receivers
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

export const recoverPassword = async(req, res) => {
    let { token } = req.params
    const { newPassword, repeatPassword } = req.body

    let sql = 'UPDATE alunos set ? WHERE aluno_id = ?'

    if (!repeatPassword || !newPassword) {
        return res.status(400).json({ ok: false, err: 'Campos obrigatórios' });
    }

    if (repeatPassword !== newPassword) {
        return res.status(400).json({ ok: false, err: 'As palavras-passe não coincidem' });
    }

    let newEncryptPassword = passwordEncrypt(newPassword)

    let data = {
        aluno_password: newEncryptPassword
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