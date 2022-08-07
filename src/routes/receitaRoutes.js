import express from 'express';
import ReceitaController from '../controllers/receitaController.js';

const router = express.Router();

router
  .get('/receitas', ReceitaController.listaReceitas)
  .post('/receitas', ReceitaController.cadastraReceita)

export default router;