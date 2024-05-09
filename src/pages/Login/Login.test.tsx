import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { MAX_LENGTH, MIN_LENGTH, loginFormSchema } from './schema';
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
  test('email address must not be empty', () => {
    const result = loginFormSchema.safeParse({ email: '', password: '5416854g64s5g4' });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe('Invalid email');
  });

  // Email address must be properly formatted and contain a domain name (e.g., user@example.com)
  test('should return false if email is not properly formatted', () => {
    const result = loginFormSchema.safeParse({ email: 'useremail', password: '5416854g64s5g4' });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe('Invalid email');
  });

  test('should return false if email does not contain a domain name', () => {
    const result = loginFormSchema.safeParse({ email: 'user@', password: '5416854g64s5g4' });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe('Invalid email');
  });

  //  Email address must contain an '@' symbol separating local part and domain name.
  test('should return false if email does not contain "@"', () => {
    const result = loginFormSchema.safeParse({ email: 'user.example.com', password: '5416854g64s5g4' });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe('Invalid email');
  });

  // Email address must not contain leading or trailing whitespace.
  test('should return false if email contains leading whitespace', () => {
    const result = loginFormSchema.safeParse({ email: ' codjhwdj@gmail.com', password: '5123456784168' });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe('Invalid email');
  });

  test('should return false if email contains trailing whitespace', () => {
    const result = loginFormSchema.safeParse({ email: 'codjhwdj@gmail.com ', password: '5123456784168' });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe('Invalid email');
  });

  // test valid email provided, Email address may contain "-", "_", ".".
  test('should return true when email contains "_"', () => {
    const result = loginFormSchema.safeParse({ email: 'valid_email@gmail.com', password: 'Valid@al%id&12!#$^*' });
    expect(result.success).toBe(true);
  });

  test('should return true when email contains "-"', () => {
    const result = loginFormSchema.safeParse({ email: 'valid-email@gmail.com', password: 'Valid@al%id&12!#$^*' });
    expect(result.success).toBe(true);
  });

  test('should return true when email contains "."', () => {
    const result = loginFormSchema.safeParse({ email: 'valid.email@gmail.com', password: 'Valid@al%id&12!#$^*' });
    expect(result.success).toBe(true);
  });

  test('email should be valid', () => {
    const result = loginFormSchema.safeParse({ email: 'validemail@gmail.com', password: 'Valid@al%id&12!#$^*' });
    expect(result.success).toBe(true);
  });
});

describe('password validation', () => {
  test('password must not be empty', () => {
    const result = loginFormSchema.safeParse({ email: 'correct_email@gmail.com', password: '' });
    expect(result.error?.issues[0].message).toBe(`Password must be at least ${MIN_LENGTH} characters long`);
    expect(result.success).toBe(false);
  });

  test(`password length must be at least 8 characters long`, () => {
    const result = loginFormSchema.safeParse({ email: 'correct_email@gmail.com', password: '54168' });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(`Password must be at least ${MIN_LENGTH} characters long`);
  });

  test(`password length should not be more, then 20 characters`, () => {
    const result = loginFormSchema.safeParse({ email: 'correct_email@gmail.com', password: 'inValidPass5416823548' });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(`Password should not be more, then ${MAX_LENGTH} characters`);
  });

  test('password must contain at least one uppercase letter', () => {
    const result = loginFormSchema.safeParse({ email: 'correct_email@gmail.com', password: 'invalid5414' });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(
      'Passwords must contain uppercase and lowercase Latin letters (A-Z, a-z)',
    );
  });

  test('Password must contain at least one lowercase Latin letter', () => {
    const result = loginFormSchema.safeParse({ email: 'correct_email@gmail.com', password: 'INVALID5414' });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(
      'Passwords must contain uppercase and lowercase Latin letters (A-Z, a-z)',
    );
  });

  test('password must contain at least one uppercase & lowercase Latin letters', () => {
    const result = loginFormSchema.safeParse({ email: 'correct_email@gmail.com', password: '12345678' });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(
      'Passwords must contain uppercase and lowercase Latin letters (A-Z, a-z)',
    );
  });

  // Password must contain at least one digit (0-9)
  test('should return false if password does not contain digits', () => {
    const result = loginFormSchema.safeParse({ email: 'correct_email@gmail.com', password: 'InvalidPass' });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe('Passwords must contain at least one digit (0-9)');
  });

  // Password must contain at least one special character (e.g., !@#$%^&*).
  test('should return false if password does not contain special character', () => {
    const result = loginFormSchema.safeParse({ email: 'correct_email@gmail.com', password: 'inValidPass12' });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe('Passwords must contain at least one special character (!@#$%^&)');
  });

  // Password must not contain leading or trailing or middle whitespace.
  test('should return false if password contains leading whitespace', () => {
    const result = loginFormSchema.safeParse({ email: 'correct_email@gmail.com', password: ' V@al%id&12!#$^*' });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe('Passwords must not contain whitespaces');
  });

  test('password should not contains trailing whitespace', () => {
    const result = loginFormSchema.safeParse({ email: 'correct_email@gmail.com', password: 'V@al%id&12!#$^* ' });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe('Passwords must not contain whitespaces');
  });

  test('should return false if password contains whitespace', () => {
    const result = loginFormSchema.safeParse({ email: 'correct_email@gmail.com', password: 'V@al% id&12!#$^* ' });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe('Passwords must not contain whitespaces');
  });

  test('password must consist only of Latin letters (A-Z, a-z)', () => {
    const result = loginFormSchema.safeParse({ email: 'correct_email@gmail.com', password: 'абвгд@R%id&12!#$*' });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe('Invalid password');
  });

  // test valid password
  test('password should be valid', () => {
    const result = loginFormSchema.safeParse({ email: 'correct_email@gmail.com', password: 'Valid@al%id&12!#$^*' });
    expect(result.success).toBe(true);
  });
});
