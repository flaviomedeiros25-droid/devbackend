import { Request, Response, NextFunction } from 'express';
import { ProjectService } from './project.service';

const projectService = new ProjectService();

export class ProjectController {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const project = await projectService.create(req.body);
      res.status(201).json(project);
    } catch (error) {
      next(error);
    }
  }

  async listAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const projects = await projectService.listAll();
      res.status(200).json(projects);
    } catch (error) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const project = await projectService.findById(id);
      res.status(200).json(project);
    } catch (error) {
      next(error);
    }
  }

  async addFeedback(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const feedback = await projectService.addFeedback(id, req.body);
      res.status(201).json(feedback);
    } catch (error) {
      next(error);
    }
  }
}
