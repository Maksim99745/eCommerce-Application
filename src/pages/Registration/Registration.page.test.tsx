import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import RegistrationPage from './Registration.page';

test('Render the registration page', () => {
  render(<RegistrationPage />);

  expect(true).toBeTruthy();
});
