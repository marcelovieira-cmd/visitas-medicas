import express from 'express';
import cors from 'cors';
import usuariosRouter from './routes/usuarios.dataconnect.routes';
import usuariosDataConnectRouter from './routes/usuarios.dataconnect.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/usuarios', usuariosRouter);
app.use('/usuarios-dataconnect', usuariosDataConnectRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});