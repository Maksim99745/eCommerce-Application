import { countriesOptions } from '@core/validation/user-registration/user-registration.const';

export const getCountryLabelByCode = (countryCode: string): string =>
  countriesOptions.find((option) => option.id === countryCode)?.label ?? 'unknown';
