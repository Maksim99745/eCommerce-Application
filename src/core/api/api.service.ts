import {
  ByProjectKeyRequestBuilder,
  Category,
  CategoryPagedQueryResponse,
  ClientResponse,
  Customer,
  CustomerSignInResult,
  MyCustomerDraft,
  MyCustomerSignin,
} from '@commercetools/platform-sdk';
import { ApiRequest } from '@commercetools/platform-sdk/dist/declarations/src/generated/shared/utils/requests-utils';
import { UserAuthOptions } from '@commercetools/sdk-client-v2/dist/declarations/src/types/sdk';
import { ClientType } from '@core/api/client-type.enum';
import { getRequestBuilder } from '@core/api/get-builder.util';
import { tokenCache } from '@core/api/token-cache.service';

export class ApiService {
  private builder!: ByProjectKeyRequestBuilder;

  constructor() {
    const token = tokenCache.get();
    let type = ClientType.anonymous;

    if (token) {
      type = token.refreshToken ? ClientType.refreshToken : ClientType.token;
    }

    this.setBuilder(type);
  }

  public setBuilder(type: ClientType, user?: UserAuthOptions): void {
    this.builder = getRequestBuilder(type, user);
  }

  public async getCategories(): Promise<CategoryPagedQueryResponse> {
    return this.callRequest(this.builder.categories().get());
  }

  public async getCategory(key: string): Promise<Category> {
    return this.callRequest(this.builder.categories().withKey({ key }).get());
  }

  public async login(customer: MyCustomerSignin): Promise<CustomerSignInResult> {
    return this.callRequest(this.builder.me().login().post({ body: customer }));
  }

  public async register(customer: MyCustomerDraft): Promise<CustomerSignInResult> {
    return this.callRequest(this.builder.me().signup().post({ body: customer }));
  }

  public async getCustomer(): Promise<Customer> {
    return this.callRequest(this.builder.me().get());
  }

  public async getCartQuantity(): Promise<number> {
    return this.callRequest(this.builder.me().carts().get()).then(
      (carts) => carts.results[0]?.totalLineItemQuantity || 0,
    );
  }

  private async callRequest<T>(request: ApiRequest<T>): Promise<T> {
    return request.execute().then((response: ClientResponse) => response.body);
  }
}

export const apiService = new ApiService();
