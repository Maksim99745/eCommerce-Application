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
  expect(result.error?.issues[4].message).toBe('Email is required');
  expect(result.error?.issues[5].message).toBe('Email should contain symbol "@"');
  expect(result.error?.issues[6].message).toBe('Email should contain domain name');
  expect(result.error?.issues[7].message).toBe('Email should not contain whitespace');
  expect(result.error?.issues[8].message).toBe(
    'Email should contain only English letters, numbers, and special symbols',
  );
  expect(result.error?.issues[9].message).toBe('Email address should be properly formatted (e.g., user@example.com)');
});

test('address data should be provided', () => {
  const result = registrationSchema.safeParse({
    firstName: 'f',
    lastName: 'g',
    birthDate: dayjs('1999-06-05T22:00:00.000Z'),
    email: 'jaks134@mail.ru',
    addresses: [{ street: '', city: '', country: '', postalCode: '' }],
  });
  expect(result.success).toBe(false);

  expect(result.error?.issues[0].message).toBe('Street is required');
  expect(result.error?.issues[1].message).toBe('City is required');
  expect(result.error?.issues[2].message).toBe('Name of the city should n"t contains numbers or special symbols');
  expect(result.error?.issues[3].message).toBe('Please select the country is required');
  expect(result.error?.issues[4].message).toBe('Please provide postal code');
  expect(result.error?.issues[5].message).toBe('You have to decide is address default');
});
