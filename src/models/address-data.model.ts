import { addressSchema } from '@core/validation/user-registration/user-registration.schema';
import { z } from 'zod';

export type AddressInformationForm = z.infer<typeof addressSchema>;
