import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import MainPage from './Main.page';

test('Render the main page', () => {
  render(<MainPage />);
  expect(true).toBeTruthy();
});
