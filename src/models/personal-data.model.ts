import { personalInformationSchema } from '@core/validation/personal-information/personal-information.chema';
import { z } from 'zod';

export type PersonalInformationForm = z.infer<typeof personalInformationSchema>;
