import '@testing-library/jest-dom';
import dayjs from 'dayjs';
import { registrationSchema } from './user-registration.validation.schema';

test('personal data should be provided', () => {
  const result = registrationSchema.safeParse({
    firstName: '',
    lastName: '',
    email: '',
    birthDate: '',
    addresses: [{ street: 'Liberty', city: 'Kaz', country: 'Uzbekistan', postalCode: '22822', isDefault: false }],
  });
  expect(result.success).toBe(false);

  expect(result.error?.issues[0].message).toBe('First name is required');
  expect(result.error?.issues[1].message).toBe('Last name is required');
  expect(result.error?.issues[2].message).toBe('Please provide correct birth date');
  expect(result.error?.issues[3].message).toBe('User should be older than 13 y.o.');
  expect(result.error?.issues[5].message).toBe('Email is required');
  expect(result.error?.issues[6].message).toBe('Email should contain symbol "@"');
  expect(result.error?.issues[7].message).toBe('Email should contain domain name');
  expect(result.error?.issues[8].message).toBe('Email should not contain whitespace');
  expect(result.error?.issues[9].message).toBe(
    'Email should contain only English letters, numbers, and special symbols',
  );
  expect(result.error?.issues[10].message).toBe('Email address should be properly formatted (e.g., user@example.com)');
});

test('address data should be provided', () => {
  const result = registrationSchema.safeParse({
    firstName: 'f',
    lastName: 'g',
    birthDate: dayjs('1999-06-05T22:00:00.000Z'),
    shippingAsBilling: true,
    email: 'jaks134@mail.ru',
    password: 'fjfD3&dl#sL',
    addresses: [{ street: '', city: '', country: '', postalCode: '', isDefault: true }],
  });
  expect(result.success).toBe(false);
  expect(result.error?.issues[0].message).toBe('Country is required');
  expect(result.error?.issues[1].message).toBe('City is required');
  expect(result.error?.issues[2].message).toBe('Street is required');
  expect(result.error?.issues[3].message).toBe('Please provide postal code');
});

test('User should be older than 13 y.o.', () => {
  const result = registrationSchema.safeParse({
    firstName: 'f',
    lastName: 'g',
    birthDate: dayjs('2018-06-05T22:00:00.000Z'),
    shippingAsBilling: true,
    email: 'jaks134@mail.ru',
    password: 'fjfD3&dl#sL',
    addresses: [
      {
        street: 'dd',
        city: 'dd',
        country: 'PL',
        postalCode: '22-223',
        isDefault: true,
      },
    ],
  });
  expect(result.success).toBe(false);
  expect(result.error?.issues[0].message).toBe('User should be older than 13 y.o.');
});

test('Name of the city should n"t contains numbers or special symbols', () => {
  const result = registrationSchema.safeParse({
    firstName: 'f',
    lastName: 'g',
    birthDate: dayjs('1999-06-05T22:00:00.000Z'),
    shippingAsBilling: true,
    email: 'jaks134@mail.ru',
    password: 'fjfD3&dl#sL',
    addresses: [
      {
        street: 'dd',
        city: '2',
        country: 'PL',
        postalCode: '22-223',
        isDefault: true,
      },
    ],
  });
  expect(result.success).toBe(false);
  expect(result.error?.issues[0].message).toBe('Name of the city should n"t contains numbers or special symbols');
});

test('Invalid post code for country: Poland', () => {
  const result = registrationSchema.safeParse({
    firstName: 'f',
    lastName: 'g',
    birthDate: dayjs('1999-06-05T22:00:00.000Z'),
    shippingAsBilling: true,
    email: 'jaks134@mail.ru',
    password: 'fjfD3&dl#sL',
    addresses: [
      {
        street: 'dd',
        city: 'Dh',
        country: 'PL',
        postalCode: '22223',
        isDefault: true,
      },
    ],
  });
  expect(result.success).toBe(false);
  expect(result.error?.issues[0].message).toBe('Invalid post code for country: Poland');
});

test('Invalid post code for country: Uzbekistan', () => {
  const result = registrationSchema.safeParse({
    firstName: 'f',
    lastName: 'g',
    birthDate: dayjs('1999-06-05T22:00:00.000Z'),
    shippingAsBilling: true,
    email: 'jaks134@mail.ru',
    password: 'fjfD3&dl#sL',
    addresses: [
      {
        street: 'dd',
        city: 'Dh',
        country: 'UZ',
        postalCode: '22223',
        isDefault: true,
      },
    ],
  });
  expect(result.success).toBe(false);
  expect(result.error?.issues[0].message).toBe('Invalid post code for country: Uzbekistan');
});

test('Invalid post code for country: Serbia', () => {
  const result = registrationSchema.safeParse({
    firstName: 'f',
    lastName: 'g',
    birthDate: dayjs('1999-06-05T22:00:00.000Z'),
    shippingAsBilling: true,
    email: 'jaks134@mail.ru',
    password: 'fjfD3&dl#sL',
    addresses: [
      {
        street: 'dd',
        city: 'Dh',
        country: 'RS',
        postalCode: '2222',
        isDefault: true,
      },
    ],
  });
  expect(result.success).toBe(false);
  expect(result.error?.issues[0].message).toBe('Invalid post code for country: Serbia');
});

test('Invalid post code for country: Ukraine', () => {
  const result = registrationSchema.safeParse({
    firstName: 'f',
    lastName: 'g',
    birthDate: dayjs('1999-06-05T22:00:00.000Z'),
    shippingAsBilling: true,
    email: 'jaks134@mail.ru',
    password: 'fjfD3&dl#sL',
    addresses: [
      {
        street: 'dd',
        city: 'Dh',
        country: 'UA',
        postalCode: '2222',
        isDefault: true,
      },
    ],
  });
  expect(result.success).toBe(false);
  expect(result.error?.issues[0].message).toBe('Invalid post code for country: Ukraine');
});
