import { ProductProjectionPagedSearchResponse } from '@commercetools/platform-sdk';
import { apiService } from '@core/api/api.service';
import { ProductFilter } from '@models/product-filter.model';
import useSWR, { SWRResponse } from 'swr';

export const useGetProducts = (filter: ProductFilter): SWRResponse<ProductProjectionPagedSearchResponse> =>
  useSWR(filter, () => apiService.getProducts(filter));
