import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { loginFormSchema } from '@core/validation/user-login.validation.schema';
import LoginPage from './Login.page';

test('Render the login page', () => {
  render(<LoginPage />);
  expect(true).toBeTruthy();
});

test('email address should be provided', () => {
  const result = loginFormSchema.safeParse({});
  expect(result.success).toBe(false);
  expect(result.error?.issues[0].message).toBe('Email is required');
});

describe('email address validation tests', () => {
  test('email address should not be empty', () => {
    const result = loginFormSchema.safeParse({ email: '', password: 'Valid@al%id&12!#$^*' });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe('Invalid email');
  });

  test('email address should be properly formatted', () => {
    const result = loginFormSchema.safeParse({ email: 'useremail', password: 'Valid@al%id&12!#$^*' });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe('Invalid email');
  });

  test('email address should contain a domain name', () => {
    const result = loginFormSchema.safeParse({ email: 'user@', password: 'Valid@al%id&12!#$^*' });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe('Invalid email');
  });

  test(`email address should contain '@' symbol`, () => {
    const result = loginFormSchema.safeParse({ email: 'user.example.com', password: 'Valid@al%id&12!#$^*' });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe('Invalid email');
  });

  test('email address should not contain leading whitespace', () => {
    const result = loginFormSchema.safeParse({ email: ' codjhwdj@gmail.com', password: 'Valid@al%id&12!#$^*' });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe('Invalid email');
  });

  test('email address should not contain trailing whitespace', () => {
    const result = loginFormSchema.safeParse({ email: 'codjhwdj@gmail.com ', password: 'Valid@al%id&12!#$^*' });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe('Invalid email');
  });

  test('email address may contain "_"', () => {
    const result = loginFormSchema.safeParse({ email: 'valid_email@gmail.com', password: 'Valid@al%id&12!#$^*' });
    expect(result.success).toBe(true);
  });

  test('email address may contain "-"', () => {
    const result = loginFormSchema.safeParse({ email: 'valid-email@gmail.com', password: 'Valid@al%id&12!#$^*' });
    expect(result.success).toBe(true);
  });

  test('email address may contain "."', () => {
    const result = loginFormSchema.safeParse({ email: 'valid.email@gmail.com', password: 'Valid@al%id&12!#$^*' });
    expect(result.success).toBe(true);
  });

  test('email should be valid', () => {
    const result = loginFormSchema.safeParse({ email: 'validemail@gmail.com', password: 'Valid@al%id&12!#$^*' });
    expect(result.success).toBe(true);
  });
});

describe('password validation tests', () => {
  test('password should not be empty', () => {
    const result = loginFormSchema.safeParse({ email: 'correct_email@gmail.com', password: '' });
    expect(result.error?.issues[0].message).toBe(`Password should be at least 8 characters long`);
    expect(result.success).toBe(false);
  });

  test(`password length should be at least 8 characters long`, () => {
    const result = loginFormSchema.safeParse({ email: 'correct_email@gmail.com', password: '54168' });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(`Password should be at least 8 characters long`);
  });

  test(`password length should not be more, than 20 characters`, () => {
    const result = loginFormSchema.safeParse({ email: 'correct_email@gmail.com', password: 'inValidPass5416823548' });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(`Password should not be more, than 20 characters`);
  });

  test('password should contain at least one lowercase Latin letter', () => {
    const result = loginFormSchema.safeParse({ email: 'correct_email@gmail.com', password: 'QQQQQQQ@%&12!#$^*' });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe('Password should contain at least 1 lowercase letter');
  });

  test('Password should contain at least 1 uppercase symbol', () => {
    const result = loginFormSchema.safeParse({ email: 'correct_email@gmail.com', password: 'sedd56%&12!#$^*' });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe('Password should contain at least 1 uppercase letter');
  });

  test('password should contain at least one digit', () => {
    const result = loginFormSchema.safeParse({
      email: 'correct_email@gmail.com',
      password: 'InvalidPass@%&!#$^*',
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe('Password should contain at least one digit (0-9)');
  });

  test('password should contain at least one special character', () => {
    const result = loginFormSchema.safeParse({ email: 'correct_email@gmail.com', password: 'inValidPass12' });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe('Password should contain at least one special character (!@#$%^&)');
  });

  test('password should not contain leading whitespace', () => {
    const result = loginFormSchema.safeParse({ email: 'correct_email@gmail.com', password: ' V@al%id&12!#$^*' });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe('Password should not contain whitespace');
  });

  test('password should not contain trailing whitespace', () => {
    const result = loginFormSchema.safeParse({ email: 'correct_email@gmail.com', password: 'V@al%id&12!#$^* ' });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe('Password should not contain whitespace');
  });

  test('password should not contain whitespace', () => {
    const result = loginFormSchema.safeParse({ email: 'correct_email@gmail.com', password: 'V@al% id&12!#$^*' });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe('Password should not contain whitespace');
  });

  test('password should consist only of Latin letters (A-Z, a-z)', () => {
    const result = loginFormSchema.safeParse({ email: 'correct_email@gmail.com', password: 'абвгд@R%id&12!#$*' });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe('Invalid password');
  });

  test('password should be valid', () => {
    const result = loginFormSchema.safeParse({ email: 'correct_email@gmail.com', password: 'sssssssfD3^3355' });
    expect(result.success).toBe(true);
  });
});
