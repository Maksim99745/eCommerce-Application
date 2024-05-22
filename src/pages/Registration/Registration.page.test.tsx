import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import RegistrationPage from './Registration.page';

jest.mock('@hooks/useAuth', () => () => ({ register: jest.fn() }));

// eslint-disable-next-line jest/no-disabled-tests
test.skip('Render the registration page', () => {
  render(
    <SnackbarProvider>
      <BrowserRouter>
        <RegistrationPage />
      </BrowserRouter>
    </SnackbarProvider>,
  );

  expect(true).toBeTruthy();
});
