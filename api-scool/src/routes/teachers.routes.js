import { Router } from 'express';
import { candidatura, professorCV } from '../controllers/teachers/candidatura.controller';
import { forgoutPasswordTeachers, loginTeachers, recoverPasswordTeachers, registerTeachers } from '../controllers/teachers/registerTeachers.controller';
import { notToken } from '../middlewares/auth.middleware';

const router = Router();

//register and login
router.post('/registerTeachers', registerTeachers)
router.post('/loginTeachers', loginTeachers)
router.post('/forgoutPasswordTeachers', forgoutPasswordTeachers)
router.patch('/recoverPasswordTeachers/:token', recoverPasswordTeachers)

//Candidatura
router.patch('/candidatura/:id', [professorCV, notToken], candidatura)

export default router;