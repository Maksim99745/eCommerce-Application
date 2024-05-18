import { z } from 'zod';
import { Dayjs } from 'dayjs';
import { loginFormSchema } from '@core/validation/user-login/user-login.schema';
import { RegistrationErrorMessages } from './user-registration.enum';
import { validateAddress, validateBirthDay, validateBirthDayByAge } from './user-registration.validation';
import { BILLING_ADDRESS_IDX, ISO_DATE_LENGTH, SHIPPING_ADDRESS_IDX } from './user-registration.const';

const birthDateSchema = z
  .custom<Dayjs>()
  .refine((date) => validateBirthDay(date), RegistrationErrorMessages.BirthDateInvalid)
  .refine(
    (date) => (validateBirthDay(date) ? validateBirthDayByAge(date.toISOString()) : false),
    RegistrationErrorMessages.BirthDateAge,
  )
  .transform((value: Dayjs) => value.toISOString().substring(0, ISO_DATE_LENGTH));

const addressSchema = z.object({
  country: z.string(),
  city: z.string(),
  street: z.string(),
  postalCode: z.string(),
  isDefault: z.boolean(),
});

export const registrationSchema = z
  .object({
    firstName: z.string().regex(/.+/, RegistrationErrorMessages.FirstNameRequired),
    lastName: z.string().regex(/.+/, RegistrationErrorMessages.LastNameRequired),
    birthDate: birthDateSchema,
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
