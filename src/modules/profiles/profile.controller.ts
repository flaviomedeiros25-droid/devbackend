import { Request, Response, NextFunction } from 'express';
import { ProfileService } from './profile.service';

const profileService = new ProfileService();

export class ProfileController {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const profile = await profileService.create(req.body);
      res.status(201).json(profile);
    } catch (error) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const profile = await profileService.findById(id);
      res.status(200).json(profile);
    } catch (error) {
      next(error);
    }
  }

  async listAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const profiles = await profileService.listAll();
      res.status(200).json(profiles);
    } catch (error) {
      next(error);
    }
  }
}
