import express from 'express';
import receitas from './receitaRoutes.js';

const routes = (app) => {
  app.route('/').get((req, res) => {
    res.status(200).send('Olá, mundo');
  });

  app.use(
    express.json(),
    receitas
  )
}

export default routes;