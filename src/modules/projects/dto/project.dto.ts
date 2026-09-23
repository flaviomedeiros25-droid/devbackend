import { z } from 'zod';

export const createProjectSchema = z.object({
  title: z.string({
    required_error: 'O título do projeto é obrigatório',
  }).min(2, 'O título deve ter pelo menos 2 caracteres'),
  
  description: z.string({
    required_error: 'A descrição é obrigatória',
  }).min(5, 'A descrição deve ter pelo menos 5 caracteres'),
  
  repositoryUrl: z.string({
    required_error: 'A URL do repositório é obrigatória',
  }).url('URL do repositório inválida (deve começar com http:// ou https://)'),
  
  deployUrl: z.string().url('URL de deploy inválida').optional().or(z.literal('')),
  
  profileId: z.string({
    required_error: 'O profileId do desenvolvedor é obrigatório',
  }).uuid('ID do perfil inválido'),
  
  technologyIds: z.array(z.string().uuid('ID de tecnologia inválido')).optional().default([]),
});

export type CreateProjectDTO = z.infer<typeof createProjectSchema>;

export const createFeedbackSchema = z.object({
  author: z.string({
    required_error: 'O nome do autor do feedback é obrigatório',
  }).min(2, 'O nome do autor deve ter pelo menos 2 caracteres'),
  
  comment: z.string({
    required_error: 'O comentário é obrigatório',
  }).min(3, 'O comentário deve ter pelo menos 3 caracteres'),
  
  rating: z.number().min(1, 'A nota mínima é 1').max(5, 'A nota máxima é 5').optional(),
});

export type CreateFeedbackDTO = z.infer<typeof createFeedbackSchema>;
