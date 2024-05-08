import { Category, CategoryPagedQueryResponse } from '@commercetools/platform-sdk';
import apiRoot from '@core/api/client';

export const getCategories = async (): Promise<CategoryPagedQueryResponse> =>
  apiRoot
    .categories()
    .get()
    .execute()
    .then((response) => response.body);

export const getCategory = async (key: string): Promise<Category> =>
  apiRoot
    .categories()
    .withKey({ key })
    .get()
    .execute()
    .then((response) => response.body);
