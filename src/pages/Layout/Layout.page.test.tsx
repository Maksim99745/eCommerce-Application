import '@testing-library/jest-dom';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react';
import { DEFAULT_REQUEST_DELAY, DEFAULT_REQUEST_TIMEOUT } from '@test/constants/time.const';
import { MemoryRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import LayoutPage from './Layout.page';

afterEach(cleanup);

jest.mock('@core/api/api.service', () => ({
  apiService: {
    getCategories: jest.fn(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              results: [
                { id: '1', key: '1', name: { en: 'Category 1' } },
                { id: '2', key: '2', name: { en: 'Category 2' } },
              ],
            });
          }, DEFAULT_REQUEST_DELAY);
        }),
    ),
  },
}));

test('Render the layout page', async () => {
  await act(async () => {
    render(
      <SnackbarProvider>
        <MemoryRouter>
          <LayoutPage />
        </MemoryRouter>
      </SnackbarProvider>,
    );
  });

  await waitFor(() => expect(screen.queryByRole('progressbar')).not.toBeInTheDocument(), {
    timeout: DEFAULT_REQUEST_TIMEOUT,
  });

  expect(await screen.findByText('Category 1')).toBeInTheDocument();
  expect(await screen.findByText('Category 2')).toBeInTheDocument();
});
