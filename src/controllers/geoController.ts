import { Request, Response, NextFunction } from 'express';
import { getCityInfo, getCountryPopulation } from '../services/geoService';
import { Report } from '../models/report';

export class GeoController {
  static async getCity(req: Request, res: Response, next: NextFunction) {
    try {
      const cityName = req.params.city as string;
      const result = await getCityInfo(cityName);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  static async createReport(req: Request, res: Response, next: NextFunction) {
    try {
      const { location, description } = req.body;

      if (!location || typeof location !== 'string' || !description || typeof description !== 'string') {
        const err: any = new Error('locacion y descripción son obligatorios y deben ser strings');
        err.status = 400;
        throw err;
      }

      const report = new Report({
        location,
        description,
        date: new Date(),
        status: 'open'
      });

      const saved = await report.save();
      res.status(201).json(saved);
    } catch (error) {
      next(error);
    }
  }

  static async getReports(_req: Request, res: Response, next: NextFunction) {
    try {
      const reports = await Report.find();
      res.json(reports);
    } catch (error) {
      next(error);
    }
  }

  static async getPopulation(req: Request, res: Response, next: NextFunction) {
    try {
      const country = req.params.country as string;
      if (!country) {
          const err: any = new Error('el parámetro country es obligatorio');
        err.status = 400;
        throw err;
      }

      const result = await getCountryPopulation(country);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}