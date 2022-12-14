import express from 'express';
import DespesaController from '../controllers/despesaController.js';

const router = express.Router();

router
  .get('/despesas', DespesaController.listaDespesas)
  .get('/despesas/:ano/:mes', DespesaController.listaDespesaPorMes)
  .get('/despesas/:id', DespesaController.listaDespesaPorId)
  .post('/despesas', DespesaController.cadastraDespesa)
  .put('/despesas/:id', DespesaController.atualizaDespesa)
  .delete('/despesas/:id', DespesaController.excluiDespesa)

export default router;