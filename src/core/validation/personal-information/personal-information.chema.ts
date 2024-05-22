import { z } from 'zod';
import { birthDateSchema, firstNameSchema, lastNameSchema } from '../user-registration/user-registration.schema';

export const personalInformationSchema = z.object({
  firstName: firstNameSchema,
  lastName: lastNameSchema,
  birthDate: birthDateSchema,
});
