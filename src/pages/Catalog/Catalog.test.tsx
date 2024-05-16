import '@testing-library/jest-dom';
import { DEFAULT_REQUEST_DELAY, DEFAULT_REQUEST_TIMEOUT } from '@test/constants/time.const';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react';
import CatalogPage from './Catalog.page';

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

  expect(screen.getByText('Loading...')).toBeInTheDocument();

  await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument(), {
    timeout: DEFAULT_REQUEST_TIMEOUT,
  });

  expect(await screen.findByText('Catalog for Category 1 page')).toBeInTheDocument();
});
