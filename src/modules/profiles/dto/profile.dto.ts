import { z } from 'zod';

export const createProfileSchema = z.object({
  name: z.string({
    required_error: 'O nome é obrigatório',
  }).min(2, 'O nome deve ter pelo menos 2 caracteres'),
  
  email: z.string({
    required_error: 'O e-mail é obrigatório',
  }).email('Formato de e-mail inválido'),
  
  bio: z.string({
    required_error: 'A biografia é obrigatória',
  }).min(5, 'A biografia deve ter pelo menos 5 caracteres'),
  
  githubUrl: z.string({
    required_error: 'A URL do GitHub é obrigatória',
  }).url('URL do GitHub inválida (deve começar com http:// ou https://)'),
  
  linkedinUrl: z.string().url('URL do LinkedIn inválida').optional().or(z.literal('')),
});

export type CreateProfileDTO = z.infer<typeof createProfileSchema>;

export interface ProfileResponseDTO {
  id: string;
  name: string;
  email: string;
  bio: string;
  githubUrl: string;
  linkedinUrl?: string | null;
  createdAt: Date;
  projects?: Array<{
    id: string;
    title: string;
    description: string;
    repositoryUrl: string;
    deployUrl?: string | null;
  }>;
}
