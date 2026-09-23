import { z } from 'zod';

export const createTechnologySchema = z.object({
  name: z.string({
    required_error: 'O nome da tecnologia é obrigatório',
  }).min(1, 'O nome da tecnologia não pode estar vazio'),
  
  category: z.string().optional(),
});

export type CreateTechnologyDTO = z.infer<typeof createTechnologySchema>;

export interface TechnologyResponseDTO {
  id: string;
  name: string;
  category?: string | null;
  createdAt: Date;
}
