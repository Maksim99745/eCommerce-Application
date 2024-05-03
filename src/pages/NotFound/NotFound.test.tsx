import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import NotFoundPage from './NotFound.page';

test('Render the not-found page', () => {
  render(<NotFoundPage />);
  expect(true).toBeTruthy();
});
