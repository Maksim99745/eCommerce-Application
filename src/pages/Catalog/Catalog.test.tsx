import '@testing-library/jest-dom';
import { DEFAULT_REQUEST_DELAY } from '@test/constants/time.const';
import { cleanup, render } from '@testing-library/react';
import CatalogPage from './Catalog.page';

afterEach(cleanup);

jest.mock('@core/api/requests', () => ({
  getCategory: jest.fn(
    () =>
      new Promise((resolve) => {
        setTimeout(() => resolve({ key: '1', name: { en: 'Category 1' } }), DEFAULT_REQUEST_DELAY);
      }),
  ),
}));

test('Render the catalog page', () => {
  render(<CatalogPage />);
  expect(true).toBeTruthy();
});
