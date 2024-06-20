import { z } from 'zod';
import { RegistrationErrorMessages } from '../user-registration/user-registration.enum';

export const promoCodeSchema = z.string().regex(/^.{0,20}$/, RegistrationErrorMessages.PromoCodeInvalidLength);

export const promoCodeFormSchema = z.object({
  promoCode: promoCodeSchema,
});
