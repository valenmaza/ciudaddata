import { Router } from 'express';
import { TransitController } from '../controllers/transitController';

const router = Router();

/**
 * @swagger
 * /transit/routes/{city}:
 *   get:
 *     summary: Obtener rutas de transporte para una ciudad (simulado)
 *     parameters:
 *       - in: path
 *         name: city
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Lista de rutas de transporte
 */
router.get('/routes/:city', TransitController.getRoutes);

/**
 * @swagger
 * /transit/eta:
 *   get:
 *     summary: Obtener tiempo estimado de llegada para una parada
 *     parameters:
 *       - in: query
 *         name: stop_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Información del ETA
 */
router.get('/eta', TransitController.getETA);

/**
 * @swagger
 * /transit/incident:
 *   post:
 *     summary: Crear un reporte de incidente de transporte
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
 *                 example: "Andén Estación X plataforma 2"
 *               description:
 *                 type: string
 *                 example: "Humo en el túnel"
 *     responses:
 *       '201':
 *         description: Incidente registrado
 */
router.post('/incident', TransitController.createIncident);
/**
 * @swagger
 * /transit/incidents:
 *   get:
 *     summary: Obtener todos los incidentes de transporte
 *     responses:
 *       '200':
 *         description: Lista de incidentes
 */
router.get('/incidents', TransitController.getIncidents);

export default router;