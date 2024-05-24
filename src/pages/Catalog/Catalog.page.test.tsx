import '@testing-library/jest-dom';
import { DEFAULT_REQUEST_DELAY, DEFAULT_REQUEST_TIMEOUT } from '@test/constants/time.const';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react';
import CatalogPage from './Catalog.page';
import '@test/mocks/inersection-observer.mock';

afterEach(cleanup);

jest.mock('@core/api/api.service', () => ({
  apiService: {
    getCategory: jest.fn(
      () =>
        new Promise((resolve) => {
          setTimeout(() => resolve({ key: '1', name: { en: 'Category 1' } }), DEFAULT_REQUEST_DELAY);
        }),
    ),
  },
}));

test('Render the catalog page', async () => {
  await act(async () => {
    render(<CatalogPage />);
  });

  expect(screen.getByRole('progressbar')).toBeInTheDocument();

  await waitFor(() => expect(screen.queryByRole('progressbar')).not.toBeInTheDocument(), {
    timeout: DEFAULT_REQUEST_TIMEOUT,
  });

  expect(await screen.findByText('Category 1 products')).toBeInTheDocument();
});
