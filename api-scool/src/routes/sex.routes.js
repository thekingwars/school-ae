import { Router } from 'express';
import { createSex, findSex, findAllSex, updateSex, deleteSex } from '../controllers/fk_general/sexo.controller';
import { notToken, verifyCode } from '../middlewares/auth.middleware';

const router = Router();

router.post('/sex', [notToken], createSex);
router.get('/sex', [notToken, verifyCode], findAllSex);
router.get('/sex/:sexo_id', findSex);
router.patch('/sex/:sexo_id', updateSex);
router.delete('/sex/:sexo_id', deleteSex);

export default router;