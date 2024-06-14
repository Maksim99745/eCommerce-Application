import useSWR, { SWRResponse } from 'swr';
import { apiService } from '@core/api/api.service';
import { Product } from '@commercetools/platform-sdk';

export const useGetProduct = (
  productKey: string,
  options?: { onError: (err: Error, key?: string) => void },
): SWRResponse<Product> =>
  useSWR<Product>(
    `products/${productKey}`,
    () => apiService.getProduct(productKey),
    options?.onError ? { onError: options.onError } : undefined,
  );
