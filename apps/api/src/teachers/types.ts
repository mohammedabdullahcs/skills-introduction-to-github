import { z } from 'zod';

export const GetTeacherByIdSchema = z.object({
  id: z.string().min(1),
});

export type GetTeacherByIdInput = z.infer<typeof GetTeacherByIdSchema>;

export type Teacher = {
  id: string;
  name: string;
  email: string;
  specialties: string[];
  rating: number;
  isAvailable: boolean;
  createdAt: Date;
};