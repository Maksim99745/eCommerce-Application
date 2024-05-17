import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import LoginPage from './Login.page';

jest.mock('@core/api/user.service', () => ({
  UserService: () => ({ login: jest.fn() }),
}));

test('Render the login page', () => {
  render(
    <SnackbarProvider>
      <Router>
        <LoginPage />
      </Router>
    </SnackbarProvider>,
  );
  expect(true).toBeTruthy();
});
