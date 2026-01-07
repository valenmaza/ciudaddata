import { Request, Response, NextFunction } from 'express';
import * as transitService from '../services/transitService';
import { Report } from '../models/report';

export class TransitController {
  static async getRoutes(req: Request, res: Response, next: NextFunction) {
    try {
      const city = String(req.params.city || '');
      const data = await transitService.getRoutes(city);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  static async getETA(req: Request, res: Response, next: NextFunction) {
    try {
      const stopId = String(req.query.stop_id || '');
      if (!stopId) {
        const err: any = new Error('stop_id query parameter is required');
        err.status = 400;
        throw err;
      }
      const data = await transitService.getETA(stopId);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  static async getIncidents(_req: Request, res: Response, next: NextFunction) {
    try {
      const incidents = await Report.find({ type: 'transit' });
      res.json(incidents);
    } catch (error) {
      next(error);
    }
  }

  static async createIncident(req: Request, res: Response, next: NextFunction) {
    try {
      const { location, description } = req.body;
      if (!location || typeof location !== 'string' || !description || typeof description !== 'string') {
        const err: any = new Error('location and description are required and must be strings');
        err.status = 400;
        throw err;
      }

      const incident = new Report({
        type: 'transit',
        location,
        description,
        date: new Date(),
        status: 'open'
      });

      const saved = await incident.save();
      res.status(201).json(saved);
    } catch (error) {
      next(error);
    }
  }
}