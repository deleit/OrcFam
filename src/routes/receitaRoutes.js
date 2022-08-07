import express from 'express';
import ReceitaController from '../controllers/receitaController.js';

const router = express.Router();

router
  .get('/receitas', ReceitaController.listaReceitas)
  .get('/receitas/:id', ReceitaController.listaReceitaPorId)
  .post('/receitas', ReceitaController.cadastraReceita)
  .put('/receitas/:id', ReceitaController.atualizaReceita)

export default router;