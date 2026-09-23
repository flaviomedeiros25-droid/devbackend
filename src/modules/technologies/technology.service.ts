import { prisma } from '../../config/database';
import { AppError } from '../../middlewares/errorHandler';
import { CreateTechnologyDTO } from './dto/technology.dto';

export class TechnologyService {
  async create(data: CreateTechnologyDTO) {
    const existingTech = await prisma.technology.findFirst({
      where: {
        name: {
          equals: data.name,
        },
      },
    });

    if (existingTech) {
      throw new AppError('Já existe uma tecnologia cadastrada com este nome', 400);
    }

    const technology = await prisma.technology.create({
      data: {
        name: data.name,
        category: data.category || null,
      },
    });

    return technology;
  }

  async listAll() {
    return prisma.technology.findMany({
      orderBy: { name: 'asc' },
    });
  }
}
