import { Router } from 'express';
import { createCurso, deleteCurso, findAllCursos, findCurso, updateCurso } from '../controllers/admin/cursos/cursos.controller';
import { createPrograma, deletePrograma, findAllPrograma, findPrograma, updatePrograma } from '../controllers/admin/cursos/programa.controller';
import { createAulas, deleteAulas, findAllAulas, findAulas, updateAulas } from '../controllers/admin/escolas/aulas.controller';
import { createEquipamentos, deleteEquipamentos, findAllEquipamentos, findEquipamentos, updateEquipamentos } from '../controllers/admin/escolas/equipamentos.controllers';
import { createEscolas, uploaderEscolaCoordeandor, findAllEscolas, findEscolas, updateEscolas, deleteEscolas } from '../controllers/admin/escolas/escolas.controller';
import { createInstalacoes, deleteInstalacoes, findAllInstalacoes, findInstalacoes, updateInstalacoes } from '../controllers/admin/escolas/instalacoes.controller';
import { createSalas, deleteSalas, findAllSalas, findSalas, updateSalas, uploaderSala } from '../controllers/admin/escolas/salas.controller';
import { createLivroEstado, deleteLivroEstado, findAllLivroEstado, findLivroEstado, updateLivroEstado } from '../controllers/admin/livros/estado_livros.controller';
import { createLivros, deleteLivros, findAllLivros, findLivros, updateLivros } from '../controllers/admin/livros/livros.controller';
import { createAdmin, deleteAdmin, findAdmin, findAllAdmin, updateAdmin } from '../controllers/admin/moreAdmin/admins.admin';
import { loginAdmin } from '../controllers/admin/register/loginSuperadmin.controllers';
import { allCandidatura, candidaturaVerify } from '../controllers/admin/teachers/teachers.admin';
import { createTurma } from '../controllers/admin/turma/turma.controller';
import { notToken } from '../middlewares/auth.middleware';


const router = Router();

//login
router.post('/login', loginAdmin)

//equipamentos
router.post('/create/equipamentos', [notToken], createEquipamentos);
router.get('/all/equipamentos', [notToken], findAllEquipamentos);
router.get('/get/equipamentos/:id', [notToken], findEquipamentos);
router.patch('/update/equipamentos/:id', [notToken], updateEquipamentos);
router.delete('/delete/equipamentos/:id', [notToken], deleteEquipamentos);

//aulas
router.post('/create/aulas', [notToken], createAulas);
router.get('/all/aulas', [notToken], findAllAulas);
router.get('/get/aulas/:id', [notToken], findAulas);
router.patch('/update/aulas/:id', [notToken], updateAulas)
router.delete('/delete/aulas/:id', [notToken], deleteAulas);

//instalacoes
router.post('/create/instalacoes', [], createInstalacoes)
router.get('/all/instalacoes', [], findAllInstalacoes);
router.get('/get/instalacoes/:id', [], findInstalacoes);
router.patch('/update/instalacoes/:id', [], updateInstalacoes);
router.delete('/delete/instalacoes/:id', [], deleteInstalacoes);

//escolas
router.post('/create/escolas', [uploaderEscolaCoordeandor, notToken], createEscolas)
router.get('/all/escolas', [notToken], findAllEscolas);
router.get('/get/escolas/:id', [notToken], findEscolas);
router.patch('/update/escolas/:id', [uploaderEscolaCoordeandor, notToken], updateEscolas);
router.delete('/delete/escolas/:id', deleteEscolas)

//salas
router.post('/create/salas', [uploaderSala], createSalas)
router.get('/all/salas', [notToken], findAllSalas);
router.get('/get/salas/:id', [notToken], findSalas);
router.patch('/update/salas/:id', [uploaderSala, notToken], updateSalas);
router.delete('/delete/salas/:id', [notToken], deleteSalas)

//estado livros
router.post('/create/estadoLivros', [notToken], createLivroEstado)
router.get('/all/estadoLivros', [notToken], findAllLivroEstado);
router.get('/get/estadoLivros/:id', [notToken], findLivroEstado);
router.patch('/update/estadoLivros/:id', [notToken], updateLivroEstado);
router.delete('/delete/estadoLivros/:id', [notToken], deleteLivroEstado)

//livros
router.post('/create/livros', [notToken], createLivros)
router.get('/all/livros', [notToken], findAllLivros)
router.get('/get/livros/:id', [notToken], findLivros)
router.patch('/update/livros/:id', [notToken], updateLivros)
router.delete('/delete/livros/:id', [notToken], deleteLivros)

//programa
router.post('/create/programa', [], createPrograma)
router.get('/all/programa', [], findAllPrograma)
router.get('/get/programa/:id', [], findPrograma)
router.patch('/update/programa/:id', [], updatePrograma)
router.delete('/delete/programa/:id', [], deletePrograma)

//curso
router.post('/create/curso', [], createCurso)
router.get('/all/curso', [], findAllCursos)
router.get('/get/curso/:id', [], findCurso)
router.patch('/update/curso/:id', [], updateCurso)
router.delete('/delete/curso/:id', [], deleteCurso)

//candidatura Verificada
router.get('/all/candidatura', allCandidatura)
router.patch('/update/candidatura/:id', [], candidaturaVerify)

//admin
router.post('/create/admin', [], createAdmin)
router.get('/all/admin', [], findAllAdmin)
router.get('/get/admin/:id', [], findAdmin)
router.patch('/update/admin/:id', [], updateAdmin)
router.delete('/delete/admin/:id', [], deleteAdmin)

//turmas
router.post('/create/turma', [], createTurma)

export default router;