import { Cart, ErrorResponse } from '@commercetools/platform-sdk';
import { minCount } from '@constants/products.const';
import { apiService } from '@core/api/api.service';
import { setCart } from '@hooks/useCart';
import { AddToCartRequest } from '@models/cart.model';
import useSWRMutation, { SWRMutationResponse } from 'swr/mutation';

export const useAddToCart = (
  params: AddToCartRequest,
): SWRMutationResponse<Cart, ErrorResponse, AddToCartRequest, Partial<AddToCartRequest>> =>
  useSWRMutation(
    params,
    (initParams, { arg }) => apiService.addToCart({ ...initParams, quantity: arg?.quantity || minCount }),
    { onSuccess: (cart) => setCart(cart) },
  );
