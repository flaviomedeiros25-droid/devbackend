import { Router } from 'express';
import { ProjectController } from './project.controller';
import { validateSchema } from '../../middlewares/validateSchema';
import { createProjectSchema, createFeedbackSchema } from './dto/project.dto';

const projectRouter = Router();
const projectController = new ProjectController();

// POST /api/projects - Cadastro de projeto com validações
projectRouter.post('/', validateSchema(createProjectSchema), projectController.create);

// GET /api/projects - Listagem de projetos com perfil e tecnologias
projectRouter.get('/', projectController.listAll);

// GET /api/projects/:id - Detalhar projeto específico
projectRouter.get('/:id', projectController.findById);

// POST /api/projects/:id/feedbacks - Cadastrar feedback em um projeto
projectRouter.post('/:id/feedbacks', validateSchema(createFeedbackSchema), projectController.addFeedback);

export { projectRouter };
