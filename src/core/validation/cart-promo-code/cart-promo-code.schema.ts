import { z } from 'zod';
import { RegistrationErrorMessages } from '../user-registration/user-registration.enum';

export const promoCodeSchema = z.string().regex(/.+/, RegistrationErrorMessages.PromoCodeRequired);

export const promoCodeFormSchema = z.object({
  promoCode: promoCodeSchema,
});
