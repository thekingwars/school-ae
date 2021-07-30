import { Router } from 'express';
import { register, login, verifyEmail, verifyPhone, forgoutPassword, recoverPassword } from '../controllers/students/register.students'
import { dadInformation, momInformation } from '../controllers/students/family.students'
import { notToken, verifyCode } from '../middlewares/auth.middleware'
import { getStudent, user, infoUserExtra, uploader } from '../controllers/students/students';

const router = Router();

//register and login
router.post('/register', register)
router.post('/login', login)
router.post('/verifyEmail', verifyEmail)
router.post('/verifyPhone', verifyPhone)
router.post('/forgoutPassword', forgoutPassword)
router.patch('/recoverPassword/:token', recoverPassword)

//Student info
router.get('/user', [notToken], user)
router.get('/getUser/:id', [notToken], getStudent)

//profile
router.patch('/profile/:id/dadInfo', [notToken], dadInformation)
router.patch('/profile/:id/momInfo', [notToken], momInformation)
router.patch('/profile/:id/alunoInfo', [uploader, notToken], infoUserExtra)

export default router;