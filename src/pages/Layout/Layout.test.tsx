import '@testing-library/jest-dom';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react';
import { DEFAULT_REQUEST_DELAY, DEFAULT_REQUEST_TIMEOUT } from '@test/constants/time.const';
import { MemoryRouter } from 'react-router-dom';
import LayoutPage from './Layout.page';

afterEach(cleanup);

jest.mock('@core/api/requests', () => ({
  getCategories: jest.fn(
    () =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            results: [
              { key: '1', name: { en: 'Category 1' } },
              { key: '2', name: { en: 'Category 2' } },
            ],
          });
        }, DEFAULT_REQUEST_DELAY);
      }),
  ),
}));

test('Render the layout page', async () => {
  await act(async () => {
    render(
      <MemoryRouter>
        <LayoutPage />
      </MemoryRouter>,
    );
  });

  // Проверяем, что текст "Loading..." отображается перед загрузкой категорий
  expect(screen.getByText('Loading...')).toBeInTheDocument();

  // Дожидаемся появления категорий
  await waitFor(
    () => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument(); // Убеждаемся, что текст "Loading..." больше не отображается
    },
    { timeout: DEFAULT_REQUEST_TIMEOUT },
  );

  // Проверяем, что категории были загружены и отображены
  expect(await screen.findByText('Category 1')).toBeInTheDocument();
  expect(await screen.findByText('Category 2')).toBeInTheDocument();
});
