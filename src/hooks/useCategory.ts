import { Category } from '@commercetools/platform-sdk';
import { signal } from '@preact/signals-react';

export const categorySignal = signal<Category | null | undefined>(undefined);
const isCategoryLoadingSignal = signal<boolean>(false);

export const setCategoryLoading = (isLoading: boolean) => {
  isCategoryLoadingSignal.value = isLoading;
};

export const setCategory = (newCategory: Category | null | undefined) => {
  categorySignal.value = newCategory;
  setCategoryLoading(false);
};

const useCategory = () => ({
  category: categorySignal.value,
  isCategoryLoading: isCategoryLoadingSignal.value,
  setCategory,
  setCategoryLoading,
});

export default useCategory;
