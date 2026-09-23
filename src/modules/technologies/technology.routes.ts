import { Router } from 'express';
import { TechnologyController } from './technology.controller';
import { validateSchema } from '../../middlewares/validateSchema';
import { createTechnologySchema } from './dto/technology.dto';

const technologyRouter = Router();
const technologyController = new TechnologyController();

// POST /api/technologies - Cadastro de tecnologia com validações
technologyRouter.post('/', validateSchema(createTechnologySchema), technologyController.create);

// GET /api/technologies - Listagem de todas as tecnologias
technologyRouter.get('/', technologyController.listAll);

export { technologyRouter };
