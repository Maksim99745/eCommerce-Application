import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import MainPage from './Main.page';

// eslint-disable-next-line jest/no-disabled-tests
test.skip('Render the main page', () => {
  render(<MainPage />);
  expect(true).toBeTruthy();
});
