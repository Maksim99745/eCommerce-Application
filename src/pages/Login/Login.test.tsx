import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import LoginPage from './Login.page';

test('Render the login page', () => {
  render(<LoginPage />);
  expect(true).toBeTruthy();
});
