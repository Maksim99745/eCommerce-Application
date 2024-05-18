import { SelectOption } from '@models/select-option.model';

export const countriesOptions: SelectOption[] = [
  { id: 'PL', label: 'Poland' },
  { id: 'UA', label: 'Ukraine' },
  { id: 'UZ', label: 'Uzbekistan' },
  { id: 'RS', label: 'Serbia' },
];

export const defaultCountryOption = countriesOptions[0];

export const postalValidationRegEx: Record<string, RegExp> = {
  PL: /^\d{2}-\d{3}$/,
  RS: /^\d{5}$/,
  UA: /^\d{5}$/,
  UZ: /^\d{6}$/,
};

export const MIN_AGE = 13;
export const ISO_DATE_LENGTH = 10;
export const CITY_REGEX = /^[a-zA-Z\s]+$/;

export const SHIPPING_ADDRESS_IDX = 0;
export const BILLING_ADDRESS_IDX = 1;
