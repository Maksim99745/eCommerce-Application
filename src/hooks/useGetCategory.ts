import { Category } from '@commercetools/platform-sdk';
import { apiService } from '@core/api/api.service';
import useSWR, { SWRResponse } from 'swr';

export const useGetCategory = (categoryKey: string): SWRResponse<Category> =>
  useSWR(`categories/${categoryKey}`, () => apiService.getCategory(categoryKey));
