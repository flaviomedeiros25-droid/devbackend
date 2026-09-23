import { prisma } from '../../config/database';
import { AppError } from '../../middlewares/errorHandler';
import { CreateProfileDTO } from './dto/profile.dto';

export class ProfileService {
  async create(data: CreateProfileDTO) {
    const existingProfile = await prisma.profile.findUnique({
      where: { email: data.email },
    });

    if (existingProfile) {
      throw new AppError('Já existe um perfil cadastrado com este e-mail', 400);
    }

    const profile = await prisma.profile.create({
      data: {
        name: data.name,
        email: data.email,
        bio: data.bio,
        githubUrl: data.githubUrl,
        linkedinUrl: data.linkedinUrl || null,
      },
    });

    return profile;
  }

  async findById(id: string) {
    const profile = await prisma.profile.findUnique({
      where: { id },
      include: {
        projects: {
          include: {
            technologies: true,
            feedbacks: true,
          },
        },
      },
    });

    if (!profile) {
      throw new AppError('Perfil não encontrado', 404);
    }

    return profile;
  }

  async listAll() {
    return prisma.profile.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { projects: true },
        },
      },
    });
  }
}
