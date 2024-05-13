import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import RegistrationPage from './Registration.page';

test('Render the registration page', () => {
  render(<RegistrationPage />);

  expect(true).toBeTruthy();
});

// test('email address should be provided', () => {
//   const result = getUseRegistrationSchema('Poland').safeParse({});
//   expect(result.success).toBe(false);
//   expect(result.error?.issues[0].message).toBe('Email is required');
// });
