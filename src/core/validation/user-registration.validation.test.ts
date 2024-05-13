import { registrationSchema } from './user-registration.validation.schema';

test('email address should be provided', () => {
  const result = registrationSchema.safeParse({});
  expect(result.success).toBe(false);
  expect(result.error?.issues[0].message).toBe('Email is required');
});
