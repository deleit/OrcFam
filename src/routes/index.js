import express from 'express';
import receitas from './receitaRoutes.js';
import despesas from './despesaRoutes.js';

const routes = (app) => {
  app.route('/').get((req, res) => {
    res.status(200).send('Olá, mundo');
  });

  app.use(
    express.json(),
    receitas,
    despesas
  );
}

export default routes;