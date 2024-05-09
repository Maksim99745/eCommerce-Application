import { z } from 'zod';

export const MIN_LENGTH = 8;
export const MAX_LENGTH = 20;
const TEST_PASSWORD_REG_EX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;

export const loginFormSchema = z.object({
  email: z.string({ required_error: 'Email is required' }).email('Invalid email'),
  password: z
    .string()
    .min(MIN_LENGTH, `Password must be at least ${MIN_LENGTH} characters long`)
    .max(MAX_LENGTH, `Password should not be more, then ${MAX_LENGTH} characters`)
    .regex(/^[^\s]+$/, 'Passwords must not contain whitespaces')
    .regex(/(?=.*[a-z])(?=.*[A-Z])/, 'Passwords must contain uppercase and lowercase Latin letters (A-Z, a-z)')
    .regex(/(?=.*\d)/, 'Passwords must contain at least one digit (0-9)')
    .regex(/(?=.*[!@#$%^&])/, 'Password must contain at least one special character (!@#$%^&)')
    .regex(passwordValidationRegEx, 'Invalid password'),
});
