import { z } from 'zod';

const MIN_LENGTH = 8;
const MAX_LENGTH = 20;

export const loginFormSchema = z.object({
  email: z.string({ required_error: 'Email is required' }).email('Invalid email'),
  password: z
    .string()
    .min(MIN_LENGTH, 'Password must be at least 8 characters long')
    .max(MAX_LENGTH, 'Password should not be more, then 20 characters'),
});
