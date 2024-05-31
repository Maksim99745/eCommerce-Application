import { ProductData } from '@commercetools/platform-sdk';
import { signal } from '@preact/signals-react';

export const productSignal = signal<ProductData | null | undefined>(undefined);
const isProductLoadingSignal = signal<boolean>(false);

export const setProductLoading = (isLoading: boolean) => {
  isProductLoadingSignal.value = isLoading;
};

export const setProduct = (newProduct: ProductData | null | undefined) => {
  productSignal.value = newProduct;
  setProductLoading(false);
};

const useProduct = () => ({
  product: productSignal.value,
  isProductLoading: isProductLoadingSignal.value,
  setProduct,
  setProductLoading,
});

export default useProduct;
