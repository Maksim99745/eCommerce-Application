import '@testing-library/jest-dom';
import CartPage from '@pages/Cart/Cart.page';
import { render } from '@testing-library/react';

// eslint-disable-next-line jest/no-disabled-tests
test.skip('Render the cart page', () => {
  render(<CartPage />);
  expect(true).toBeTruthy();
});
