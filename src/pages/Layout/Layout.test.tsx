import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import LayoutPage from './Layout.page';

test('Render the layout page', () => {
  render(<LayoutPage />);
  expect(true).toBeTruthy();
});
