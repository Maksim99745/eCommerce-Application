import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import LoginPage from './Login.page';

jest.mock('@core/api/use-auth.hook', () => ({
  useAuth: () => ({
    register: jest.fn(),
    isLoading: false,
  }),
}));

test('Render the login page', () => {
  render(
    <Router>
      <LoginPage />
    </Router>,
  );
  expect(true).toBeTruthy();
});
