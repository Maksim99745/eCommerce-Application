import {
  ByProjectKeyRequestBuilder,
  Category,
  CategoryPagedQueryResponse,
  ClientResponse,
  Customer,
  CustomerSignInResult,
  MyCustomerDraft,
  MyCustomerSignin,
  MyCustomerUpdateAction,
  ProductProjectionPagedSearchResponse,
  Product,
  CartPagedQueryResponse,
  Cart,
  LineItem,
} from '@commercetools/platform-sdk';
import { ApiRequest } from '@commercetools/platform-sdk/dist/declarations/src/generated/shared/utils/requests-utils';
import { UserAuthOptions } from '@commercetools/sdk-client-v2';
import { defaultProductsLimit, defaultProductsOffset, minCount } from '@constants/products.const';
import { ClientType } from '@core/api/client-type.enum';
import { getRequestBuilder } from '@core/api/get-builder.util';
import { tokenCache } from '@core/api/token-cache.service';
import { AddToCartRequest, ChangeCartItemQuantityRequest } from '@models/cart.model';
import { GetProductsRequest } from '@models/product-filter.model';
import { NewPasswordRequestData } from '@pages/Profile/hooks/useSubmitNewPassword';

export class ApiService {
  private builder!: ByProjectKeyRequestBuilder;
  public clientType!: ClientType;

  constructor() {
    const token = tokenCache.get();
    let type = ClientType.anonymous;

    if (token) {
      const now = new Date().getTime();
      type = now > token.expirationTime ? ClientType.refreshToken : ClientType.token;
    }

    this.setBuilder(type);
  }

  public setBuilder(type: ClientType, user?: UserAuthOptions): void {
    this.clientType = type;
    this.builder = getRequestBuilder(type, user);
  }

  public async getCategories(): Promise<CategoryPagedQueryResponse> {
    return this.callRequest(this.builder.categories().get());
  }

  public async getCategory(key: string): Promise<Category> {
    return this.callRequest(this.builder.categories().withKey({ key }).get());
  }

  public async getProduct(key: string): Promise<Product> {
    return this.callRequest(this.builder.products().withKey({ key }).get());
  }

  public async login(customer: MyCustomerSignin): Promise<CustomerSignInResult> {
    return this.callRequest(this.builder.me().login().post({ body: customer }));
  }

  public async register(customer: MyCustomerDraft): Promise<CustomerSignInResult> {
    return this.callRequest(this.builder.me().signup().post({ body: customer }));
  }

  public async updateCustomer(customerVersion: number, ...action: MyCustomerUpdateAction[]): Promise<Customer> {
    return this.callRequest(this.builder.me().post({ body: { version: customerVersion, actions: [...action] } }));
  }

  public async changePassword(newPasswordData: NewPasswordRequestData): Promise<Customer> {
    return this.callRequest(
      this.builder
        .me()
        .password()
        .post({
          body: {
            version: newPasswordData.version,
            currentPassword: newPasswordData.currentPassword,
            newPassword: newPasswordData.newPassword,
          },
        }),
    );
  }

  public async getCustomer(): Promise<Customer> {
    return this.callRequest(this.builder.me().get());
  }

  public async getCarts(): Promise<CartPagedQueryResponse> {
    return this.callRequest(this.builder.me().carts().get());
  }

  public async createCart(): Promise<Cart> {
    return this.callRequest(
      this.builder
        .me()
        .carts()
        .post({ body: { currency: 'EUR' } }),
    );
  }

  public async addToCart({ cart, productId, quantity }: AddToCartRequest): Promise<Cart> {
    const userCart = cart || (await this.createCart());

    return this.callRequest(
      this.builder
        .me()
        .carts()
        .withId({ ID: userCart.id })
        .post({
          body: {
            version: userCart.version,
            actions: [
              {
                action: 'addLineItem',
                productId,
                quantity,
              },
            ],
          },
        }),
    );
  }

  public async changeCartItemQuantity({
    cart,
    lineItemId,
    quantity = minCount,
  }: ChangeCartItemQuantityRequest): Promise<Cart> {
    const userCart = cart || (await this.createCart());

    return this.callRequest(
      this.builder
        .me()
        .carts()
        .withId({ ID: userCart.id })
        .post({
          body: {
            version: userCart.version,
            actions: [
              {
                action: 'changeLineItemQuantity',
                lineItemId,
                quantity,
              },
            ],
          },
        }),
    );
  }

  public async removeCartLineItem({ lineItem, cart }: { lineItem: LineItem; cart?: Cart }): Promise<Cart> {
    const userCart = cart || (await this.createCart());

    return this.callRequest(
      this.builder
        .me()
        .carts()
        .withId({ ID: userCart.id })
        .post({
          body: {
            version: userCart.version,
            actions: [
              {
                action: 'removeLineItem',
                lineItemId: lineItem.id,
              },
            ],
          },
        }),
    );
  }

  public async getProducts({
    filter,
    limit = defaultProductsLimit,
    offset = defaultProductsOffset,
    sort,
    query,
  }: GetProductsRequest): Promise<ProductProjectionPagedSearchResponse> {
    return this.callRequest(
      this.builder
        .productProjections()
        .search()
        .get({ queryArgs: { fuzzy: true, offset, limit, filter, sort, 'text.en': query } }),
    );
  }

  private async callRequest<T>(request: ApiRequest<T>): Promise<T> {
    return request.execute().then((response: ClientResponse) => response.body);
  }
}

export const apiService = new ApiService();
