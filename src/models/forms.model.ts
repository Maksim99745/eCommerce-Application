import { loginFormSchema } from '@core/validation/user-login/user-login.schema';
import { registrationSchema } from '@core/validation/user-registration/user-registration.schema';
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
