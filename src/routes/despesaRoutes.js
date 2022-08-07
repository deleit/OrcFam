import express from 'express';
import DespesaController from '../controllers/despesaController.js';

const router = express.Router();

router
  .get('/despesas', DespesaController.listaDespesas)
  .get('/despesas/:id', DespesaController.listaDespesaPorId)
  .post('/despesas', DespesaController.cadastraDespesa)

export default router;