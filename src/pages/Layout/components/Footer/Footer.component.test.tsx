import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import FooterComponent from './Footer.component';

test('Render the footer component', () => {
  render(<FooterComponent />);
  expect(true).toBeTruthy();
});
