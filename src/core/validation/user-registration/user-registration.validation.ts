import { getCountryLabelByCode } from '@utils/get-country-label-by-code';
import { z } from 'zod';
import dayjs from 'dayjs';
import { RegistrationFormAddress } from '@pages/Registration/components/RegistrationForm.component';
import { RegistrationErrorMessages } from './user-registration.enum';
import { CITY_REGEX, MIN_AGE, postalValidationRegEx } from './user-registration.const';

const hasFieldValue = (field: string) => z.string().regex(/.+/).safeParse(field).success;
const getAddressFieldIssue = (field: string, index: number, message: string) => ({
  code: z.ZodIssueCode.custom,
  message,
  path: ['addresses', index, field],
});

const validateCountry = (address: RegistrationFormAddress, index: number, context: z.RefinementCtx) => {
  if (!hasFieldValue(address.country)) {
    context.addIssue(getAddressFieldIssue('country', index, RegistrationErrorMessages.CountryRequired));
  }
};

const validateCity = (address: RegistrationFormAddress, index: number, context: z.RefinementCtx) => {
  if (!hasFieldValue(address.city)) {
    context.addIssue(getAddressFieldIssue('city', index, RegistrationErrorMessages.CityRequired));
    return;
  }

  const isCityValid = z.string().regex(CITY_REGEX).safeParse(address.city).success;
  if (!isCityValid) {
    context.addIssue(getAddressFieldIssue('city', index, RegistrationErrorMessages.CityInvalid));
  }
};

const validateStreet = (address: RegistrationFormAddress, index: number, context: z.RefinementCtx) => {
  if (!hasFieldValue(address.street)) {
    context.addIssue(getAddressFieldIssue('street', index, RegistrationErrorMessages.StreetRequired));
  }
};

const validatePostalCode = (addresses: RegistrationFormAddress[], index: number, context: z.RefinementCtx) => {
  const address = addresses[index];

  if (!hasFieldValue(address.postalCode)) {
    context.addIssue(getAddressFieldIssue('postalCode', index, RegistrationErrorMessages.PostalCodeRequired));
    return;
  }

  const postalCodeTestReg = new RegExp(postalValidationRegEx[address.country]);
  if (!postalCodeTestReg.test(address.postalCode)) {
    const message = `${RegistrationErrorMessages.PostalCodeInvalid}: ${getCountryLabelByCode(address.country)}`;
    context.addIssue(getAddressFieldIssue('postalCode', index, message));
  }
};

export const validateAddress = (addresses: RegistrationFormAddress[], index: number, context: z.RefinementCtx) => {
  const address = addresses[index];

  if (!address) {
    context.addIssue(getAddressFieldIssue('street', index, RegistrationErrorMessages.AddressRequired));
  }

  validateCountry(address, index, context);
  validateCity(address, index, context);
  validateStreet(address, index, context);
  validatePostalCode(addresses, index, context);
};

export const validateBirthDay = (date: dayjs.Dayjs) => dayjs.isDayjs(date) && date.isValid();

export const validateBirthDayByAge = (dateString: string) => {
  const validDate = dayjs().subtract(MIN_AGE, 'year');
  const inputDate = dayjs(dateString);

  return inputDate.isSame(validDate, 'days') || inputDate.isBefore(validDate, 'days');
};
