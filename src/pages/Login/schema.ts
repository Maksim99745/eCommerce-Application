import { z } from 'zod';

const MIN_LENGTH = 8;
const MAX_LENGTH = 20;
const TEST_PASSWORD_REG_EX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;

export const loginFormSchema = z.object({
  email: z.string({ required_error: 'Email is required' }).email('Invalid email'),
  password: z
    .string()
    .min(MIN_LENGTH, `Password must be at least ${MIN_LENGTH} characters long`)
    .max(MAX_LENGTH, `Password should not be more, than ${MAX_LENGTH} characters`)
    .regex(/^[^\s]+$/, 'Password must not contain whitespace')
    .regex(/(?=.*[a-z])(?=.*[A-Z])/, 'Password must contain both uppercase & lowercase Latin letters (A-Z, a-z)')
    .regex(/(?=.*\d)/, 'Password must contain at least one digit (0-9)')
    .regex(/(?=.*[!@#$%^&])/, 'Password must contain at least one special character (!@#$%^&)')
    .regex(TEST_PASSWORD_REG_EX, 'Invalid password'),
});
