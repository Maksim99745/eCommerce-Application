import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import LoginPage from './Login.page';

jest.mock('@hooks/useAuth', () => () => ({ login: jest.fn() }));

test('Render the login page', () => {
  render(
    <SnackbarProvider>
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    </SnackbarProvider>,
  );
  expect(true).toBeTruthy();
});
