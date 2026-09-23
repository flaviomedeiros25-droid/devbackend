import { prisma } from '../../config/database';
import { AppError } from '../../middlewares/errorHandler';
import { CreateProjectDTO, CreateFeedbackDTO } from './dto/project.dto';

export class ProjectService {
  async create(data: CreateProjectDTO) {
    // Verificar se o perfil informado existe
    const profile = await prisma.profile.findUnique({
      where: { id: data.profileId },
    });

    if (!profile) {
      throw new AppError('Perfil (profileId) especificado não foi encontrado', 404);
    }

    // Verificar se as tecnologias informadas existem
    if (data.technologyIds && data.technologyIds.length > 0) {
      const existingTechs = await prisma.technology.findMany({
        where: {
          id: {
            in: data.technologyIds,
          },
        },
      });

      if (existingTechs.length !== data.technologyIds.length) {
        throw new AppError('Uma ou mais tecnologias especificadas não foram encontradas', 400);
      }
    }

    const project = await prisma.project.create({
      data: {
        title: data.title,
        description: data.description,
        repositoryUrl: data.repositoryUrl,
        deployUrl: data.deployUrl || null,
        profileId: data.profileId,
        technologies: {
          connect: data.technologyIds?.map((id) => ({ id })) || [],
        },
      },
      include: {
        profile: {
          select: {
            id: true,
            name: true,
            email: true,
            githubUrl: true,
          },
        },
        technologies: true,
        feedbacks: true,
      },
    });

    return project;
  }

  async listAll() {
    return prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        profile: {
          select: {
            id: true,
            name: true,
            email: true,
            githubUrl: true,
          },
        },
        technologies: true,
        feedbacks: true,
      },
    });
  }

  async findById(id: string) {
    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        profile: true,
        technologies: true,
        feedbacks: true,
      },
    });

    if (!project) {
      throw new AppError('Projeto não encontrado', 404);
    }

    return project;
  }

  async addFeedback(projectId: string, data: CreateFeedbackDTO) {
    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      throw new AppError('Projeto não encontrado para registrar o feedback', 404);
    }

    const feedback = await prisma.feedback.create({
      data: {
        author: data.author,
        comment: data.comment,
        rating: data.rating || null,
        projectId: projectId,
      },
    });

    return feedback;
  }
}
