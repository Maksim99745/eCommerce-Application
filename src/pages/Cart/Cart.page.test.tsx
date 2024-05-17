import '@testing-library/jest-dom';
import CartPage from '@pages/Cart/Cart.page';
import { render } from '@testing-library/react';

test('Render the cart page', () => {
  render(<CartPage />);
  expect(true).toBeTruthy();
});
