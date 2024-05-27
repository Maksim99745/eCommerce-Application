import { loginFormSchema } from '@core/validation/user-login/user-login.schema';
import {
  personalInformationSchema,
  profileAddressesSchema,
  profileAddressSchema,
} from '@core/validation/user-profile/user-profile.schema';
import { addressSchema, registrationSchema } from '@core/validation/user-registration/user-registration.schema';
import { z } from 'zod';

export type RegistrationForm = z.infer<typeof registrationSchema>;
export type LoginForm = z.infer<typeof loginFormSchema>;
export type AddressInformationForm = z.infer<typeof addressSchema>;
export type PersonalInformationForm = z.infer<typeof personalInformationSchema>;
// TODO please rename type names above to xxxxFormData, as below
// User Profile
export type AddressType = AddressInformationForm['addressType'];
export type ProfileAddressFormData = z.infer<typeof profileAddressSchema>;
export type ProfileAddressesFormData = z.infer<typeof profileAddressesSchema>;
