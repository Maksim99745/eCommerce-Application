import { z } from 'zod';
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { loginFormSchema } from '@core/validation/user-login/user-login.schema';
import { RegistrationErrorMessages } from './user-registration.enum';
import { validateAddress, validateBirthDay, validateBirthDayByAge } from './user-registration.validation';
import {
  BILLING_ADDRESS_IDX,
  ISO_DATE_LENGTH,
  NAME_SURNAME_REGEX,
  SHIPPING_ADDRESS_IDX,
} from './user-registration.const';

dayjs.extend(utc);

export const firstNameSchema = z
  .string()
  .regex(/.+/, RegistrationErrorMessages.FirstNameRequired)
  .regex(NAME_SURNAME_REGEX, RegistrationErrorMessages.FirstNameInvalid);

export const lastNameSchema = z
  .string()
  .regex(/.+/, RegistrationErrorMessages.LastNameRequired)
  .regex(NAME_SURNAME_REGEX, RegistrationErrorMessages.LastNameInvalid);

export const birthDateSchema = z
  .custom<Dayjs | string>()
  .refine((date) => validateBirthDay(dayjs.utc(date)), RegistrationErrorMessages.BirthDateInvalid)
  .refine(
    (date) => (validateBirthDay(dayjs.utc(date)) ? validateBirthDayByAge(dayjs.utc(date).toISOString()) : false),
    RegistrationErrorMessages.BirthDateAge,
  )
  .transform((value) => dayjs.utc(value).toISOString().substring(0, ISO_DATE_LENGTH));

export const addressSchema = z.object({
  country: z.string(),
  city: z.string(),
  street: z.string(),
  postalCode: z.string(),
  isBilling: z.boolean(),
  isShipping: z.boolean(),
  isNewAddress: z.boolean(),
});

export const registrationSchema = z
  .object({
    firstName: firstNameSchema,
    lastName: lastNameSchema,
    birthDate: birthDateSchema,
    shippingAsBilling: z.boolean(),
    addresses: z.array(addressSchema),
    defaultShippingAddressIdx: z.number(),
    defaultBillingAddressIdx: z.number(),
  })
  .merge(loginFormSchema)
  .superRefine((formValues, context) => {
    validateAddress(formValues.addresses, SHIPPING_ADDRESS_IDX, context);

    if (!formValues.shippingAsBilling) {
      validateAddress(formValues.addresses, BILLING_ADDRESS_IDX, context);
    }
  });
