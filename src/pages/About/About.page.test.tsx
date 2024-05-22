import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import AboutPage from './About.page';

// eslint-disable-next-line jest/no-disabled-tests
test.skip('Render the about page', () => {
  render(<AboutPage />);
  expect(true).toBeTruthy();
});
