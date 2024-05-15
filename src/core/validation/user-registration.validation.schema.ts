import { z } from 'zod';
import dayjs, { Dayjs } from 'dayjs';
import { getCountryLabelByCode } from '@constants/countries.const';
import { loginFormSchema } from './user-login.validation.schema';

interface PostalValidationRegEx {
  [key: string]: RegExp;
}

export const postalValidationRegEx: PostalValidationRegEx = {
  PL: /^\d{2}-\d{3}$/,
  RS: /^\d{5}$/,
  UA: /^\d{5}$/,
  UZ: /^\d{6}$/,
};

const MIN_AGE = 13;

const validateBirthDay = (dateString: string) => {
  console.log(dateString);
  const validDate = dayjs().subtract(MIN_AGE, 'year');
  const inputDate = dayjs(dateString);
  return inputDate.isSame(validDate, 'days') || inputDate.isBefore(validDate, 'days');
};

export const registrationSchema = z
  .object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    birthDate: z
      .custom<Dayjs>()
      .refine((value) => dayjs.isDayjs(value) && value.isValid(), {
        message: 'Please provide correct birth date',
      })
      .refine((value) => (dayjs.isDayjs(value) && value.isValid() ? validateBirthDay(value.toISOString()) : false), {
        message: 'User should be older than 13 y.o.',
      })
      .transform((value: Dayjs) => value.toISOString()),
    addresses: z.array(
      z
        .object({
          street: z.string().min(1, 'Street is required'),
          city: z
            .string()
            .min(1, 'City is required')
            .regex(/^[a-zA-Z\s]+$/, 'Name of the city should n"t contains numbers or special symbols'),
          country: z.string().min(1, 'Please select the country is required'),
          postalCode: z.string().min(1, 'Please provide postal code'),
          isDefault: z.boolean({ required_error: 'You have to decide is address default' }),
        })
        .superRefine((formValues, context) => {
          const postalCodeTestReg = new RegExp(postalValidationRegEx[formValues.country]);
          if (!postalCodeTestReg.test(formValues.postalCode)) {
            context.addIssue({
              code: z.ZodIssueCode.custom,
              message: `Invalid post code for country: ${getCountryLabelByCode(formValues.country)}`,
              path: ['postalCode'],
            });
          }
        }),
    ),
  })
  .merge(loginFormSchema);
