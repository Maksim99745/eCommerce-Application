import { promoCodeFormSchema } from '@core/validation/cart-promo-code/cart-promo-code.schema';
import { loginFormSchema } from '@core/validation/user-login/user-login.schema';
import {
  passwordInformationSchema,
  personalInformationSchema,
  profileAddressesSchema,
  profileAddressSchema,
} from '@core/validation/user-profile/user-profile.schema';
import { registrationSchema, addressSchema } from '@core/validation/user-registration/user-registration.schema';

import { z } from 'zod';

export type PasswordInformationFormData = z.infer<typeof passwordInformationSchema>;
export type RegistrationFormData = z.infer<typeof registrationSchema>;
export type LoginFormData = z.infer<typeof loginFormSchema>;
export type AddressInformationFormData = z.infer<typeof addressSchema>;
export type PersonalInformationFormData = z.infer<typeof personalInformationSchema>;
export type AddressType = 'billing' | 'shipping';
export type ProfileAddressFormData = z.infer<typeof profileAddressSchema>;
export type ProfileAddressesFormData = z.infer<typeof profileAddressesSchema>;
export type CartPromoCodeFormData = z.infer<typeof promoCodeFormSchema>;
