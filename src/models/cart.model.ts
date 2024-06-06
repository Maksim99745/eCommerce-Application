import { Cart } from '@commercetools/platform-sdk';

export interface AddToCartRequest {
  cart: Cart | null | undefined;
  productId: string;
  quantity?: number;
}

export interface ChangeCartItemQuantityRequest {
  cart: Cart | null | undefined;
  lineItemId?: string;
  quantity?: number;
}
