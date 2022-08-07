import 'dotenv/config';
import express from 'express';
import db from './config/dbConnect.js';
import routes from './routes/index.js'

db.on('err', console.log.bind(console, 'Erro de conexão'));
db.once('open', () => console.log('Conexão com o banco de dados efetuada com sucesso!'));
const app = express();

app.use(express.json());

routes(app);

export default app;