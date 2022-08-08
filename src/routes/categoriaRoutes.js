import express from 'express';
import CategoriaController from '../controllers/categoriaController.js';

const router = express.Router();

router
    .get('/categorias', CategoriaController.listaCategorias)
    .get('/categoria/:id', CategoriaController.listaCategoriasPorId)

export default router;