import { loginFormSchema } from '@core/validation/user-login/user-login.schema';
import {
  passwordInformationSchema,
  personalInformationSchema,
} from '@core/validation/user-profile/user-profile.schema';
import { registrationSchema, addressSchema } from '@core/validation/user-registration/user-registration.schema';
import { z } from 'zod';

export type RegistrationForm = z.infer<typeof registrationSchema>;
export type LoginForm = z.infer<typeof loginFormSchema>;
export type AddressInformationForm = z.infer<typeof addressSchema>;
export type PersonalInformationForm = z.infer<typeof personalInformationSchema>;
export type PasswordInformationForm = z.infer<typeof passwordInformationSchema>;
