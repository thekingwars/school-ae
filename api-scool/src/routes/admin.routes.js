import { Router } from 'express';
import { createAulas, deleteAulas, findAllAulas, findAulas, updateAulas } from '../controllers/admin/escolas/aulas.controller';
import { createEquipamentos, deleteEquipamentos, findAllEquipamentos, findEquipamentos, updateEquipamentos } from '../controllers/admin/escolas/equipamentos.controllers';
import { createEscolas, uploaderEscolaCoordeandor, findAllEscolas, findEscolas, updateEscolas, deleteEscolas } from '../controllers/admin/escolas/escolas.controller';
import { createInstalacoes, deleteInstalacoes, findAllInstalacoes, findInstalacoes, updateInstalacoes } from '../controllers/admin/escolas/instalacoes.controller';
import { createSalas, deleteSalas, findAllSalas, findSalas, updateSalas, uploaderSala } from '../controllers/admin/escolas/salas.controller';
import { createLivroEstado, deleteLivroEstado, findAllLivroEstado, findLivroEstado, updateLivroEstado } from '../controllers/admin/livros/estado_livros.controller';
import { createLivros, deleteLivros, findAllLivros, findLivros, updateLivros } from '../controllers/admin/livros/livros.controller';
import { loginAdmin } from '../controllers/admin/register/loginSuperadmin.controllers';
import { notToken } from '../middlewares/auth.middleware';


const router = Router();

//login
router.post('/login', loginAdmin)

//equipamentos
router.post('/create/equipamentos', [], createEquipamentos);
router.get('/all/equipamentos', [], findAllEquipamentos);
router.get('/get/equipamentos/:id', [], findEquipamentos);
router.patch('/update/equipamentos/:id', [], updateEquipamentos);
router.delete('/delete/equipamentos/:id', [], deleteEquipamentos);

//aulas
router.post('/create/aulas', [], createAulas);
router.get('/all/aulas', [], findAllAulas);
router.get('/get/aulas/:id', [], findAulas);
router.patch('/update/aulas/:id', [], updateAulas)
router.delete('/delete/aulas/:id', [], deleteAulas);

//instalacoes
router.post('/create/instalacoes', [], createInstalacoes)
router.get('/all/instalacoes', [], findAllInstalacoes);
router.get('/get/instalacoes/:id', [], findInstalacoes);
router.patch('/update/instalacoes/:id', [], updateInstalacoes);
router.delete('/delete/instalacoes/:id', [], deleteInstalacoes);

//escolas
router.post('/create/escolas', [uploaderEscolaCoordeandor], createEscolas)
router.get('/all/escolas', [], findAllEscolas);
router.get('/get/escolas/:id', [], findEscolas);
router.patch('/update/escolas/:id', [uploaderEscolaCoordeandor], updateEscolas);
router.delete('/delete/escolas/:id', deleteEscolas)

//salas
router.post('/create/salas', [uploaderSala], createSalas)
router.get('/all/salas', [], findAllSalas);
router.get('/get/salas/:id', [], findSalas);
router.patch('/update/salas/:id', [uploaderSala], updateSalas);
router.delete('/delete/salas/:id', [], deleteSalas)

//estado livros
router.post('/create/estadoLivros', [], createLivroEstado)
router.get('/all/estadoLivros', [], findAllLivroEstado);
router.get('/get/estadoLivros/:id', [], findLivroEstado);
router.patch('/update/estadoLivros/:id', [], updateLivroEstado);
router.delete('/delete/estadoLivros/:id', [], deleteLivroEstado)

//livros
router.post('/create/livros', [notToken], createLivros)
router.get('/all/livros', [notToken], findAllLivros)
router.get('/get/livros/:id', [notToken], findLivros)
router.patch('/update/livros/:id', [notToken], updateLivros)
router.delete('/delete/livros/:id', [notToken], deleteLivros)

export default router;