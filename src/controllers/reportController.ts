import { Request, Response } from 'express';
import { Report } from '../models/Report';

export const createReport = async (req: Request, res: Response) => {
    try {
        const newReport = new Report(req.body);
        const savedReport = await newReport.save();
        res.status(201).json(savedReport);
    } catch (error) {
        res.status(400).json({ error: 'Error al crear el reporte' });
    }
};
