import { CategoryPagedQueryResponse, ProductPagedQueryResponse } from '@commercetools/platform-sdk';
import apiRoot from '@core/api/client';

export const getCategories = async (): Promise<CategoryPagedQueryResponse> =>
  apiRoot
    .categories()
    .get()
    .execute()
    .then((response) => response.body);

export const getProductsList = (): Promise<ProductPagedQueryResponse> =>
  apiRoot
    .products()
    .get()
    .execute()
    .then((response) => response.body);
