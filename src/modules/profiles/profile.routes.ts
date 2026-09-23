import { Router } from 'express';
import { ProfileController } from './profile.controller';
import { validateSchema } from '../../middlewares/validateSchema';
import { createProfileSchema } from './dto/profile.dto';

const profileRouter = Router();
const profileController = new ProfileController();

// POST /api/profiles - Cadastro de perfil com validações
profileRouter.post('/', validateSchema(createProfileSchema), profileController.create);

// GET /api/profiles/:id - Buscar perfil por id
profileRouter.get('/:id', profileController.findById);

// GET /api/profiles - Listagem geral de perfis
profileRouter.get('/', profileController.listAll);

export { profileRouter };
