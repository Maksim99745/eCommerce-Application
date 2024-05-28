import { RegistrationErrorMessages } from '@core/validation/user-registration/user-registration.enum';
import { z } from 'zod';

const MIN_LENGTH = 8;
const MAX_LENGTH = 20;
const TEST_PASSWORD_REG_EX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*.])[A-Za-z\d!@#$%^&*.]{8,20}$/;

export const emailSchema = z
  .string({ required_error: RegistrationErrorMessages.EmailRequired })
  .regex(/.+/, RegistrationErrorMessages.EmailRequired)
  .regex(/(?=.*@)/, 'Email should contain symbol "@"')
  .regex(/^[^@]+@[^@]+\.[^@]+$/, 'Email should contain domain name')
  .regex(/^[^\s]+$/, 'Email should not contain whitespace')
  .regex(/^[a-zA-Z0-9!@#$%^._&*-]+$/, 'Email should contain only English letters, numbers, and special symbols')
  .email('Email address should be properly formatted (e.g., user@example.com)');
export const passwordSchema = z
  .string({ required_error: RegistrationErrorMessages.PasswordRequired })
  .regex(/.+/, RegistrationErrorMessages.PasswordRequired)
  .regex(/^[^\s]+$/, 'Password should not contain whitespace')
  .regex(/(?=.*[A-Z])/, 'Password should contain at least 1 English uppercase letter')
  .regex(/(?=.*[a-z])/, 'Password should contain at least 1 English lowercase letter')
  .regex(/(?=.*\d)/, 'Password should contain at least one digit (0-9)')
  .regex(/(?=.*[!@#$%^&*.])/, 'Password should contain at least one special symbol (!@#$%^&*.)')
  .min(MIN_LENGTH, `Password length should be at least ${MIN_LENGTH} characters long`)
  .max(MAX_LENGTH, `Password should not be more, than ${MAX_LENGTH} characters`)
  .regex(/^[a-zA-Z0-9!@#$%^.&*]+$/, 'Password may contain only English letters, numbers & symbols (!@#$%^&*.)')
  .regex(TEST_PASSWORD_REG_EX, 'Invalid password');

export const loginFormSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
