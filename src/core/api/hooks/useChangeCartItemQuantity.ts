import { Cart, ErrorResponse } from '@commercetools/platform-sdk';
import { minCount } from '@constants/products.const';
import { apiService } from '@core/api/api.service';
import { setCart } from '@hooks/useCart';
import { ChangeCartItemQuantityRequest } from '@models/cart.model';
import useSWRMutation, { SWRMutationResponse } from 'swr/mutation';

export const useChangeCartItemQuantity = (
  params: ChangeCartItemQuantityRequest,
): SWRMutationResponse<Cart, ErrorResponse, ChangeCartItemQuantityRequest, Partial<ChangeCartItemQuantityRequest>> =>
  useSWRMutation(
    params,
    (initParams, { arg }) =>
      apiService.changeCartItemQuantity({
        ...initParams,
        quantity: arg.quantity || minCount,
      }),
    { onSuccess: (cart) => setCart(cart) },
  );
