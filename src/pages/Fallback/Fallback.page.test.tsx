import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import FallbackPage from './Fallback.page';

// eslint-disable-next-line jest/no-disabled-tests
test.skip('Render the fallback page', () => {
  render(<FallbackPage />);
  expect(true).toBeTruthy();
});
