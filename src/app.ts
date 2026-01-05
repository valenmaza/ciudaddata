import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db'; 
//import geoRoutes from './routes/geoRoutes';
//import reportRoutes from './routes/reportRoutes';
dotenv.config();

const app = express();
app.use(express.json()); // Para que el servidor entienda JSON

connectDB(); // Conectar a la base de datos
//app.use('/api/geo', geoRoutes); // Rutas de geolocalización
//app.use('/api/reports', reportRoutes);
const PORT = process.env.PORT || 3000;

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('CiudadData API funcionando ');
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

export default app;