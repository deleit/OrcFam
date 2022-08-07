import express from 'express';
import DespesaController from '../controllers/despesaController.js';

const router = express.Router();

router
  .get('/despesas', DespesaController.listaDespesas)

export default router;