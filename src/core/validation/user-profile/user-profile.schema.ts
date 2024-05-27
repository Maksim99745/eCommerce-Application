import { z } from 'zod';
import {
  addressSchema,
  birthDateSchema,
  firstNameSchema,
  lastNameSchema,
} from '../user-registration/user-registration.schema';
import { validateAddress } from '../user-registration/user-registration.validation';
import { emailSchema } from '../user-login/user-login.schema';

export const personalInformationSchema = z.object({
  firstName: firstNameSchema,
  lastName: lastNameSchema,
  dateOfBirth: birthDateSchema,
  email: emailSchema,
});

export const userProfileAddressesSchema = z
  .object({
    addresses: z.array(addressSchema.and(z.object({ id: z.string() }))),
    defaultShippingAddressIdx: z.number(),
    defaultBillingAddressIdx: z.number(),
  })

  .superRefine((formValues, context) => {
    formValues.addresses.forEach((_, index, addresses) => validateAddress(addresses, index, context));
  });