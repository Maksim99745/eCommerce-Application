import { z } from 'zod';
import dayjs from 'dayjs';

interface PostalValidationRegEx {
  [key: string]: RegExp;
}

const postalValidationRegEx: PostalValidationRegEx = {
  Poland: /^\d{2}-\d{3}$/,
  Serbia: /^\d{5}$/,
  Ukraine: /^\d{5}$/,
  Uzbekistan: /^\d{6}$/,
};

const MIN_LENGTH = 8;
const MAX_LENGTH = 20;
const MIN_AGE = 13;
const passwordValidationRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.\d)(?=.[!@#$%^&])[A-Za-z\d!@#$%^&]{8,20}$/;

const validateBirthDay = (dateString: string) => {
  const validDate = dayjs().subtract(MIN_AGE, 'year');
  const inputDate = dayjs(dateString);
  return inputDate.isSame(validDate, 'days') || inputDate.isBefore(validDate, 'days');
};

export const getUseRegistrationSchema = (country: string) =>
  z.object({
    email: z.string({ required_error: 'Email is required' }).email('Invalid email'),
    password: z
      .string()
      .min(MIN_LENGTH, `Password must be at least ${MIN_LENGTH} characters long`)
      .max(MAX_LENGTH, `Password should not be more, then ${MAX_LENGTH} characters`)
      .regex(/^[^\s]+$/, 'Passwords must not contain white spaces')
      .regex(/[A-Z]/, 'Password should contains at least 1 uppercase symbol')
      .regex(/[a-z]/, 'Password should contains at least 1 lowercase symbol')
      .regex(/(?=.*[a-z])(?=.*[A-Z])/, 'Passwords must contain uppercase and lowercase Latin letters (A-Z, a-z)')
      .regex(/(?=.\d)/, 'Passwords must contain at least one digit (0-9)')
      .regex(/(?=.[!@#$%^&])/, 'Passwords must contain at least one special character (!@#$%^&)')
      .regex(passwordValidationRegEx, 'Invalid password'),
    firstName: z.string().min(1, 'First name should contains at least 1 symbol'),
    lastName: z.string().min(1, 'Last name should contains at least 1 symbol'),
    birthDate: z.custom().refine((value) => (dayjs.isDayjs(value) ? validateBirthDay(value.toISOString()) : true), {
      message: 'User should be older than 13 y.o.',
    }),
    street: z.string().min(1, 'Street should contains at least 1 symbol'),
    city: z
      .string()
      .min(1, 'City should contains at least 1 symbol')
      .regex(/^[a-zA-Z]+$/, 'Name of the city should n"t contains numbers or special symbols'),
    country: z.string({ required_error: 'Please select country' }),
    postalCode: z
      .string()
      .regex(new RegExp(postalValidationRegEx[country]), `Invalid post code for country: ${country}`),
  });
