import useSWR, { SWRResponse } from 'swr';
import { apiService } from '@core/api/api.service';
import { Product, ProductData } from '@commercetools/platform-sdk';

export const useGetProduct = (
  productKey: string,
  options?: { onError: (err: Error, key?: string) => void },
): SWRResponse<Product['masterData']['current']> =>
  useSWR<ProductData>(
    `products/${productKey}`,
    () => apiService.getProduct(productKey).then((response) => response.masterData.current),
    options?.onError ? { onError: options.onError } : undefined,
  );

export const useFetchPromoCodeDescriptions = (promoCodeId: string) =>
  useSWR(promoCodeId, () =>
    apiService.getPromoCodeDescription({
      promoCodeId,
    }),
  );
