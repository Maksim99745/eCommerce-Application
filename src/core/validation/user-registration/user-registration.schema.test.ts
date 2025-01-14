import '@testing-library/jest-dom';
import { RegistrationErrorMessages } from '@core/validation/user-registration/user-registration.enum';
import dayjs from 'dayjs';
import { registrationSchema } from '@core/validation/user-registration/user-registration.schema';
import { exampleRegistrationData } from '@test/mocks/registration.mock';

test('personal data should be provided', () => {
  const result = registrationSchema.safeParse({
    firstName: '',
    lastName: '',
    email: 'jaks145@mail.ru',
    password: '1sGddd%hhhH',
    defaultShippingAddressIdx: -1,
    defaultBillingAddressIdx: -1,
    shippingAsBilling: true,
    birthDate: '',
    addresses: [
      {
        streetName: 'Liberty',
        city: 'Kaz',
        country: 'Uzbekistan',
        postalCode: '22822',
        isBilling: false,
        isShipping: false,
        isNewAddress: true,
      },
    ],
  });
  expect(result.success).toBe(false);

  expect(result.error?.issues[0].message).toBe(RegistrationErrorMessages.FirstNameRequired);
  expect(result.error?.issues[1].message).toBe(RegistrationErrorMessages.FirstNameInvalid);
  expect(result.error?.issues[2].message).toBe(RegistrationErrorMessages.LastNameRequired);
  expect(result.error?.issues[3].message).toBe(RegistrationErrorMessages.LastNameInvalid);
  expect(result.error?.issues[4].message).toBe(RegistrationErrorMessages.BirthDateInvalid);
  expect(result.error?.issues[5].message).toBe(RegistrationErrorMessages.BirthDateAge);
});

test('address data should be provided', () => {
  const result = registrationSchema.safeParse({
    firstName: 'f',
    lastName: 'g',
    birthDate: dayjs('1999-06-05T22:00:00.000Z'),
    shippingAsBilling: true,
    defaultShippingAddressIdx: -1,
    defaultBillingAddressIdx: -1,
    email: 'jaks134@mail.ru',
    password: 'fjfD3&dl#sL',
    addresses: [
      {
        streetName: '',
        city: '',
        country: '',
        postalCode: '',
        isBilling: false,
        isShipping: false,
        isNewAddress: true,
      },
    ],
  });
  expect(result.success).toBe(false);
  expect(result.error?.issues[0].message).toBe(RegistrationErrorMessages.CountryRequired);
  expect(result.error?.issues[1].message).toBe(RegistrationErrorMessages.CityRequired);
  expect(result.error?.issues[2].message).toBe(RegistrationErrorMessages.StreetRequired);
  expect(result.error?.issues[3].message).toBe(RegistrationErrorMessages.PostalCodeRequired);
});

test('User should be older than 13 y.o.', () => {
  const result = registrationSchema.safeParse(exampleRegistrationData);
  expect(result.success).toBe(false);
  expect(result.error?.issues[0].message).toBe(RegistrationErrorMessages.BirthDateAge);
});

test('First and last names should not contain numbers or special symbols', () => {
  const result = registrationSchema.safeParse({ ...exampleRegistrationData, firstName: '1', lastName: '2' });
  expect(result.success).toBe(false);
  expect(result.error?.issues[0].message).toBe(RegistrationErrorMessages.FirstNameInvalid);
  expect(result.error?.issues[1].message).toBe(RegistrationErrorMessages.LastNameInvalid);
});

test('Name of the city should not contain numbers or special symbols', () => {
  const result = registrationSchema.safeParse({
    firstName: 'f',
    lastName: 'g',
    birthDate: dayjs('1999-06-05T22:00:00.000Z'),
    shippingAsBilling: true,
    defaultShippingAddressIdx: -1,
    defaultBillingAddressIdx: -1,
    email: 'jaks134@mail.ru',
    password: 'fjfD3&dl#sL',
    addresses: [
      {
        streetName: 'dd',
        city: '2',
        country: 'PL',
        postalCode: '22-223',
        isBilling: false,
        isShipping: false,
        isNewAddress: true,
      },
    ],
  });
  expect(result.success).toBe(false);
  expect(result.error?.issues[0].message).toBe(RegistrationErrorMessages.CityInvalid);
});

test('Invalid post code for country: Poland', () => {
  const result = registrationSchema.safeParse({
    firstName: 'f',
    lastName: 'g',
    birthDate: dayjs('1999-06-05T22:00:00.000Z'),
    defaultShippingAddressIdx: -1,
    defaultBillingAddressIdx: -1,
    shippingAsBilling: true,
    email: 'jaks134@mail.ru',
    password: 'fjfD3&dl#sL',
    addresses: [
      {
        streetName: 'dd',
        city: 'Dh',
        country: 'PL',
        postalCode: '22223',
        isBilling: false,
        isShipping: false,
        isNewAddress: true,
      },
    ],
  });
  expect(result.success).toBe(false);
  expect(result.error?.issues[0].message).toBe(`${RegistrationErrorMessages.PostalCodeInvalid}: Poland`);
});

test('Invalid post code for country: Uzbekistan', () => {
  const result = registrationSchema.safeParse({
    firstName: 'f',
    lastName: 'g',
    birthDate: dayjs('1999-06-05T22:00:00.000Z'),
    shippingAsBilling: true,
    defaultShippingAddressIdx: -1,
    defaultBillingAddressIdx: -1,
    email: 'jaks134@mail.ru',
    password: 'fjfD3&dl#sL',
    addresses: [
      {
        streetName: 'dd',
        city: 'Dh',
        country: 'UZ',
        postalCode: '22223',
        isBilling: false,
        isShipping: false,
        isNewAddress: true,
      },
    ],
  });
  expect(result.success).toBe(false);
  expect(result.error?.issues[0].message).toBe(`${RegistrationErrorMessages.PostalCodeInvalid}: Uzbekistan`);
});

test('Invalid post code for country: Serbia', () => {
  const result = registrationSchema.safeParse({
    firstName: 'f',
    lastName: 'g',
    birthDate: dayjs('1999-06-05T22:00:00.000Z'),
    shippingAsBilling: true,
    defaultShippingAddressIdx: -1,
    defaultBillingAddressIdx: -1,
    email: 'jaks134@mail.ru',
    password: 'fjfD3&dl#sL',
    addresses: [
      {
        streetName: 'dd',
        city: 'Dh',
        country: 'RS',
        postalCode: '2222',
        isBilling: false,
        isShipping: false,
        isNewAddress: true,
      },
    ],
  });
  expect(result.success).toBe(false);
  expect(result.error?.issues[0].message).toBe(`${RegistrationErrorMessages.PostalCodeInvalid}: Serbia`);
});

test('Invalid post code for country: Ukraine', () => {
  const result = registrationSchema.safeParse({
    firstName: 'f',
    lastName: 'g',
    birthDate: dayjs('1999-06-05T22:00:00.000Z'),
    shippingAsBilling: true,
    defaultShippingAddressIdx: -1,
    defaultBillingAddressIdx: -1,
    email: 'jaks134@mail.ru',
    password: 'fjfD3&dl#sL',
    addresses: [
      {
        streetName: 'dd',
        city: 'Dh',
        country: 'UA',
        postalCode: '2222',
        isBilling: false,
        isShipping: false,
        isNewAddress: true,
      },
    ],
  });
  expect(result.success).toBe(false);
  expect(result.error?.issues[0].message).toBe(`${RegistrationErrorMessages.PostalCodeInvalid}: Ukraine`);
});
