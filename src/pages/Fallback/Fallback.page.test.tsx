import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import FallbackPage from './Fallback.page';

test('Render the fallback page', () => {
  render(<FallbackPage />);
  expect(true).toBeTruthy();
});
