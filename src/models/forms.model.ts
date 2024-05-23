import { loginFormSchema } from '@core/validation/user-login/user-login.schema';
import {
  registrationSchema,
  addressSchema,
  firstNameSchema,
  lastNameSchema,
  birthDateSchema,
} from '@core/validation/user-registration/user-registration.schema';
import { z } from 'zod';

export type RegistrationForm = z.infer<typeof registrationSchema>;
export type LoginForm = z.infer<typeof loginFormSchema>;

export interface RegistrationFormAddress {
  addressType: 'billing' | 'shipping';
  street: string;
  city: string;
  country: string;
  postalCode: string;
}

export const personalInformationSchema = z.object({
  firstName: firstNameSchema,
  lastName: lastNameSchema,
  birthDate: birthDateSchema,
});

export type AddressInformationForm = z.infer<typeof addressSchema>;

export type PersonalInformationForm = z.infer<typeof personalInformationSchema>;
