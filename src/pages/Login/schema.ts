import { z } from 'zod';

const MIN_LENGTH = 8;
const MAX_LENGTH = 20;
const passwordValidationRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;
const invalidPasswordMessage =
  'Passwords must consist only of Latin letters (A-Z, a-z), be 8 - 20 characters and contain at least: one uppercase letter (A-Z), one lowercase letter (a-z), one digit (0-9) and one special character (e.g., !@#$%^&*)';

export const loginFormSchema = z.object({
  email: z.string({ required_error: 'Email is required' }).email('Invalid email'),
  password: z
    .string()
    .min(MIN_LENGTH, 'Password must be at least 8 characters long')
    .max(MAX_LENGTH, 'Password should not be more, then 20 characters')
    .refine((val) => passwordValidationRegEx.test(val), `${invalidPasswordMessage}`),
});
