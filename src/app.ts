import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import geoRoutes from './routes/geoRoutes';
import transitRoutes from './routes/transitRoutes';
import errorHandler from './middlewares/errorHandler';
import { swaggerUi, specs } from './config/swagger';

dotenv.config();

const app = express();
app.use(express.json());

connectDB();

app.use('/geo', geoRoutes);
app.use('/transit', transitRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}

export default app;