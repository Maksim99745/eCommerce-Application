import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react';
import { setCategory, setCategoryLoading } from '@hooks/useCategory';
import CatalogPage from '@pages/Catalog/Catalog.page';
import '@testing-library/jest-dom';
import '@test/mocks/intersection-observer.mock';

describe('CatalogPage', () => {
  beforeEach(() => {
    setCategory(undefined);
    setCategoryLoading(false);
  });

  it('renders loading state correctly', async () => {
    setCategoryLoading(true);

    act(() => render(<CatalogPage />));

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders not found state correctly', async () => {
    setCategory(null);

    act(() => render(<CatalogPage />));

    expect(screen.getByText(/category not found/i)).toBeInTheDocument();
  });

  it('renders category correctly', async () => {
    setCategory({
      id: '1',
      version: 1,
      name: { en: 'Test Category' },
      slug: { en: 'test-category' },
      ancestors: [],
      orderHint: '0.1',
      createdAt: new Date().toISOString(),
      lastModifiedAt: new Date().toISOString(),
    });

    act(() => render(<CatalogPage />));

    await waitFor(() => screen.getByText(/test category/i));

    expect(screen.getByText(/test category products/i)).toBeInTheDocument();
  });
});
