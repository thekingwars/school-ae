import { Router } from 'express';
import { createNivel, deleteNivel, findAllNivel, findNivel, updateNivel } from '../controllers/nivel.controller'

const router = Router();

router.post('/nivel', createNivel);
router.get('/nivel', findAllNivel);
router.get('/nivel/:nivel_id', findNivel);
router.patch('/nivel/:nivel_id', updateNivel);
router.delete('/nivel/:nivel_id', deleteNivel);

export default router;