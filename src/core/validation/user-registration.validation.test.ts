import '@testing-library/jest-dom';
import { registrationSchema } from './user-registration.validation.schema';

test('first name should be provided', () => {
  const result = registrationSchema.safeParse({
    firstName: '',
    lastName: '',
    email: '',
    addresses: [{ street: '', city: '', country: '', postalCode: '' }],
  });
  expect(result.success).toBe(false);
  expect(result.error?.issues[0].message).toBe('First name is required');
  expect(result.error?.issues[1].message).toBe('Last name is required');
  expect(result.error?.issues[3].message).toBe('Name of the city should n"t contains numbers or special symbols');
  expect(result.error?.issues[4].message).toBe('Email is required');
  expect(result.error?.issues[5].message).toBe('Email should contain symbol "@"');
  expect(result.error?.issues[6].message).toBe('Email should contain domain name');
  expect(result.error?.issues[7].message).toBe('Email should not contain whitespace');
  expect(result.error?.issues[8].message).toBe('Email address should be properly formatted (e.g., user@example.com)');
});
