import { SelectOption } from '@models/index';

export const countriesOptions: SelectOption[] = [
  { id: 'PL', label: 'Poland' },
  { id: 'UA', label: 'Ukraine' },
  { id: 'UZ', label: 'Uzbekistan' },
  { id: 'RS', label: 'Serbia' },
];

export const getCountryLabelByCode = (countryCode: string): string =>
  countriesOptions.find((option) => option.id === countryCode)?.label ?? 'unknown';

export const defaultCountryOption = countriesOptions[0];
