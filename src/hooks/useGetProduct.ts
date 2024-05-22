import useSWR, { SWRResponse } from 'swr';
import { apiService } from '@core/api/api.service';

import { Product } from '@commercetools/platform-sdk';

export const useGetProduct = (productKey: string): SWRResponse<Product['masterData']['current']> =>
  useSWR(`products/${productKey}`, () =>
    apiService.getProduct(productKey).then((response) => response.masterData.current),
  );
