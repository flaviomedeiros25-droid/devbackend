import { Request, Response, NextFunction } from 'express';
import { TechnologyService } from './technology.service';

const technologyService = new TechnologyService();

export class TechnologyController {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const technology = await technologyService.create(req.body);
      res.status(201).json(technology);
    } catch (error) {
      next(error);
    }
  }

  async listAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const technologies = await technologyService.listAll();
      res.status(200).json(technologies);
    } catch (error) {
      next(error);
    }
  }
}
