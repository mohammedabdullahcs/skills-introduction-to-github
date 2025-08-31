import { z } from 'zod';

export const RegisterUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1),
});

export const LoginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const GetCurrentUserSchema = z.object({
  token: z.string().min(1),
});

export type RegisterUserInput = z.infer<typeof RegisterUserSchema>;
export type LoginUserInput = z.infer<typeof LoginUserSchema>;
export type GetCurrentUserInput = z.infer<typeof GetCurrentUserSchema>;

export type User = {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
};

export type AuthToken = {
  token: string;
  userId: string;
  expiresAt: Date;
};