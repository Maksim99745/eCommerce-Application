import { ProductProjectionPagedSearchResponse } from '@commercetools/platform-sdk';
import useSWR, { SWRResponse } from 'swr';
import { apiService } from '@core/api/api.service';
import { ProductFilter } from '@models/product-filter.model';
import { mapProductFilterToRequest } from '@utils/map-product-filter-to-request';

export const useGetProducts = (
  filter: ProductFilter,
  options?: { onSuccess: (data: ProductProjectionPagedSearchResponse) => void },
): SWRResponse<ProductProjectionPagedSearchResponse> =>
  useSWR(`products${JSON.stringify(filter)}`, () => apiService.getProducts(mapProductFilterToRequest(filter)), {
    dedupingInterval: 1,
    ...(options?.onSuccess ? { onSuccess: options.onSuccess } : undefined),
  });
