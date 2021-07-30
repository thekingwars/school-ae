import { Router } from 'express';
import routeSex from './sex.routes'
import routeNivel from './nivel.routes'
import student from './students.routes'
import admin from './admin.routes'
import teachers from './teachers.routes'

const router = Router();

router.use('/', routeSex)
router.use('/', routeNivel)
router.use('/student', student)
router.use('/admin', admin)
router.use('/teacher', teachers)

export default router