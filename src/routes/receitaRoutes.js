import express from 'express';
import ReceitaController from '../controllers/receitaController.js';

const router = express.Router();

router
  .get('/receitas', ReceitaController.listaReceitas)
  .get('/receitas/:ano/:mes', ReceitaController.listaReceitaPorMes)
  .get('/receitas/:id', ReceitaController.listaReceitaPorId)
  .post('/receitas', ReceitaController.cadastraReceita)
  .put('/receitas/:id', ReceitaController.atualizaReceita)
  .delete('/receitas/:id', ReceitaController.excluiReceita)

export default router;