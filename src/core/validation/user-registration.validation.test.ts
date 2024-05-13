import '@testing-library/jest-dom';
import { registrationSchema } from './user-registration.validation.schema';

test('first name should be provided', () => {
  const result = registrationSchema.safeParse({});
  expect(result.success).toBe(false);
  expect(result.error?.issues[0].message).toBe('First name is required');
});

test('last name should be provided', () => {
  const result = registrationSchema.safeParse({});
  expect(result.success).toBe(false);
  expect(result.error?.issues[1].message).toBe('Last name is required');
});

//TODO: add birthday test

test('Street should be provided', () => {
  const result = registrationSchema.safeParse({});
  expect(result.success).toBe(false);
  expect(result.error?.issues[3].message).toBe('Street is required');
});
