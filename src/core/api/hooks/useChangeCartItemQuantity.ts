import { Cart, ErrorResponse } from '@commercetools/platform-sdk';
import { minCount } from '@constants/products.const';
import { apiService } from '@core/api/api.service';
import { createAppErrorMessage } from '@core/errorHandlers/createAppErrorMessage';
import { setCart, useCart } from '@hooks/useCart';
import { useShowMessage } from '@hooks/useShowMessage';
import { ChangeCartItemQuantityRequest } from '@models/cart.model';
import useSWRMutation, { SWRMutationResponse } from 'swr/mutation';

export const useChangeCartItemQuantity = (
  params: ChangeCartItemQuantityRequest,
): SWRMutationResponse<Cart, ErrorResponse, ChangeCartItemQuantityRequest, Partial<ChangeCartItemQuantityRequest>> => {
  const { loadCart } = useCart();
  const showMessage = useShowMessage();

  return useSWRMutation(
    params,
    (initParams, { arg }) =>
      apiService.changeCartItemQuantity({
        ...initParams,
        quantity: arg.quantity || minCount,
      }),
    {
      onSuccess: (cart) => setCart(cart),
      onError: async (error) => {
        await loadCart();
        showMessage(createAppErrorMessage(error), 'error');
      },
    },
  );
};
