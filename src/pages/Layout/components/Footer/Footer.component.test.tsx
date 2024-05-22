import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import FooterComponent from './Footer.component';

// eslint-disable-next-line jest/no-disabled-tests
test.skip('Render the footer component', () => {
  render(<FooterComponent />);
  expect(true).toBeTruthy();
});
