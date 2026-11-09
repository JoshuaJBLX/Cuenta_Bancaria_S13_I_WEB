import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './config/db.js';
import cuentaRoutes from './routes/cuenta.routes.js';
import errorHandler from './middlewares/errorHandler.js';

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/cuenta', cuentaRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log('\x1b[32m[SERVER]\x1b[0m Servidor corriendo en puerto ' + PORT);
});