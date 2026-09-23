import { Router } from 'express';
import { profileRouter } from '../modules/profiles/profile.routes';
import { technologyRouter } from '../modules/technologies/technology.routes';
import { projectRouter } from '../modules/projects/project.routes';

const routes = Router();

routes.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'DevShowcase API em execução' });
});

routes.use('/profiles', profileRouter);
routes.use('/technologies', technologyRouter);
routes.use('/projects', projectRouter);

export { routes };
