import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import AboutPage from './About.page';

test('Render the about page', () => {
  render(<AboutPage />);
  expect(true).toBeTruthy();
});
