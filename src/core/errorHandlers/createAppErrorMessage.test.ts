import '@testing-library/jest-dom';
import { createAppErrorMessage } from './createAppErrorMessage';

type ErrorWithBody = Error & { body?: { errors?: Array<{ code?: string; field?: string }> } };

describe('createAppErrorMessage', () => {
  // eslint-disable-next-line jest/no-disabled-tests
  test.skip('should return DuplicateField error message', () => {
    const error: ErrorWithBody = new Error('Error');
    error.body = {
      errors: [{ code: 'DuplicateField', field: 'email' }],
    };

    const message = createAppErrorMessage(error);
    expect(message).toBe(`An account with the provided email already exists. 
      Please log in with your existing account or use a different email to sign up.`);
  });
  // eslint-disable-next-line jest/no-disabled-tests
  test.skip('should return InvalidCredentials error message', () => {
    const error: ErrorWithBody = new Error('Error');
    error.body = {
      errors: [{ code: 'InvalidCredentials' }],
    };

    const message = createAppErrorMessage(error);
    expect(message).toBe(`No account was found with the provided email and password. 
      Please check your credentials and try again. 
      If you don't have an account, you can sign up.`);
  });
  // eslint-disable-next-line jest/no-disabled-tests
  test.skip('should return the default error message', () => {
    const error = new Error('Unknown error occurred');
    const message = createAppErrorMessage(error);
    expect(message).toBe('Error: Unknown error occurred');
  });
  // eslint-disable-next-line jest/no-disabled-tests
  test.skip('should return stringified unknown error', () => {
    const unknownError = { message: 'Something went wrong' };
    const message = createAppErrorMessage(unknownError);
    expect(message).toBe('[object Object]');
  });
  // eslint-disable-next-line jest/no-disabled-tests
  test.skip('should return the default field in DuplicateField error message if field is not provided', () => {
    const error: ErrorWithBody = new Error('Error');
    error.body = {
      errors: [{ code: 'DuplicateField' }],
    };

    const message = createAppErrorMessage(error);
    expect(message).toBe(`An account with the provided credentials already exists. 
      Please log in with your existing account or use a different credentials to sign up.`);
  });
});
