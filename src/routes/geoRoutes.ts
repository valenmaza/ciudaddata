import { Router } from 'express';
import { GeoController } from '../controllers/geoController';

const router = Router();

/**
 * @swagger
 * /geo/city/{city}:
 *   get:
 *     summary: Obtener información de la ciudad por nombre
 *     parameters:
 *       - in: path
 *         name: city
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Información de la ciudad
 */
router.get('/city/:city', GeoController.getCity);

/**
 * @swagger
 * /geo/population/{country}:
 *   get:
 *     summary: Obtener la población más reciente para un código de país
 *     parameters:
 *       - in: path
 *         name: country
 *         required: true
 *         schema:
 *           type: string
 *           example: US
 *     responses:
 *       '200':
 *         description: Información de población
 */
router.get('/population/:country', GeoController.getPopulation);

/**
 * @swagger
 * /geo/report:
 *   post:
 *     summary: Crear un nuevo reporte ciudadano
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - location
 *               - description
 *             properties:
 *               location:
 *                 type: string
 *                 example: "Calle Principal y 3"
 *               description:
 *                 type: string
 *                 example: "Bache que provoca demoras"
 *     responses:
 *       '201':
 *         description: Reporte creado
 */
router.post('/report', GeoController.createReport);

export default router;