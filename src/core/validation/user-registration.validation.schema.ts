import { z } from 'zod';
import dayjs, { Dayjs } from 'dayjs';
import { getCountryLabelByCode } from '@constants/countries.const';
import { Address } from '@models/index';
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

export const SHIPPING_ADDRESS_IDX = 0;
export const BILLING_ADDRESS_IDX = 1;

const addressSchema = z.object({
  country: z.string(),
  city: z.string(),
  street: z.string(),
  postalCode: z.string(),
  isDefault: z.boolean(),
});

const validatePostalCode = (addresses: Address[], index: number, context: z.RefinementCtx) => {
  const address = addresses[index];
  if (!z.string().min(1).safeParse(address.postalCode).success) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Please provide postal code',
      path: ['addresses', index, 'postalCode'],
    });
  } else {
    const postalCodeTestReg = new RegExp(postalValidationRegEx[address.country]);
    if (!postalCodeTestReg.test(address.postalCode)) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Invalid post code for country: ${getCountryLabelByCode(address.country)}`,
        path: ['addresses', index, 'postalCode'],
      });
    }
  }
};

const validateCity = (addresses: Address[], index: number, context: z.RefinementCtx) => {
  const address = addresses[index];
  if (!z.string().min(1).safeParse(address.city).success) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'City is required',
      path: ['addresses', index, 'city'],
    });
  } else if (
    !z
      .string()
      .regex(/^[a-zA-Z\s]+$/)
      .safeParse(address.city).success
  ) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Name of the city should n"t contains numbers or special symbols',
      path: ['addresses', index, 'city'],
    });
  }
};

const validateAddress = (addresses: Address[], index: number, context: z.RefinementCtx) => {
  const address = addresses[index];

  if (!address) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      message: `Address is required`,
      path: ['addresses', index, 'country'],
    });
  }
  if (!z.string().min(1).safeParse(address.country).success) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Country is required',
      path: ['addresses', index, 'country'],
    });
  }
  validateCity(addresses, index, context);
  if (!z.string().min(1).safeParse(address.street).success) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Street is required',
      path: ['addresses', index, 'street'],
    });
  }
  validatePostalCode(addresses, index, context);
};

const validateBirthDay = (dateString: string) => {
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
      .transform((value: Dayjs) => value.toISOString().substring(0, 10)),
    shippingAsBilling: z.boolean(),
    addresses: z.array(addressSchema),
  })
  .merge(loginFormSchema)
  .superRefine((formValues, context) => {
    validateAddress(formValues.addresses, SHIPPING_ADDRESS_IDX, context);
    if (!formValues.shippingAsBilling) {
      validateAddress(formValues.addresses, BILLING_ADDRESS_IDX, context);
    }
  });
