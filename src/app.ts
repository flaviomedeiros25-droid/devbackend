import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { routes } from './routes';
import { errorHandler } from './middlewares/errorHandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', routes);

// Rota para caminhos não encontrados (404)
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: `Rota ${req.method} ${req.originalUrl} não encontrada`,
  });
});

// Middleware Global de Tratamento de Erros
app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor DevShowcase API rodando na porta ${PORT}`);
    console.log(`📡 URL base: http://localhost:${PORT}/api`);
  });
}

export default app;
