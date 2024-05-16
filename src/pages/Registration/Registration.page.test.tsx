import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RegistrationPage from './Registration.page';

jest.mock('@core/api/user.service', () => ({
  UserService: () => ({ register: jest.fn() }),
}));

test('Render the registration page', () => {
  render(
    <BrowserRouter>
      <RegistrationPage />
    </BrowserRouter>,
  );

  expect(true).toBeTruthy();
});
