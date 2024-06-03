import { CategoryPagedQueryResponse } from '@commercetools/platform-sdk';
import { apiService } from '@core/api/api.service';
import useSWR, { SWRResponse } from 'swr';

export const useGetCategories = (): SWRResponse<CategoryPagedQueryResponse> =>
  useSWR('categories', () => apiService.getCategories());
