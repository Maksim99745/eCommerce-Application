import { Cart, ErrorResponse } from '@commercetools/platform-sdk';
import { minCount } from '@constants/products.const';
import { apiService } from '@core/api/api.service';
import { createAppErrorMessage } from '@core/errorHandlers/createAppErrorMessage';
import { setCart, useCart } from '@hooks/useCart';
import { useShowMessage } from '@hooks/useShowMessage';
import { AddToCartRequest } from '@models/cart.model';
import useSWRMutation, { SWRMutationResponse } from 'swr/mutation';

export const useAddToCart = (
  params: AddToCartRequest,
): SWRMutationResponse<Cart, ErrorResponse, AddToCartRequest, Partial<AddToCartRequest>> => {
  const { loadCart } = useCart();
  const showMessage = useShowMessage();

  return useSWRMutation(
    params,
    (initParams, { arg }) => apiService.addToCart({ ...initParams, quantity: arg?.quantity || minCount }),
    {
      onSuccess: (cart) => {
        setCart(cart);
        const lineItem = cart.lineItems.find(
          (item) => item.productId === params.productId && item.variant.id === params.variantId,
        );
        if (lineItem) {
          const productName = lineItem.name?.en;
          const productVariant = lineItem.variant?.attributes?.find((attr) => attr.name === 'color')?.value || '';
          showMessage(`${productName} (${productVariant}) successfully added to your Cart 🛒`);
        }
      },
      onError: async (error) => {
        await loadCart();
        showMessage(createAppErrorMessage(error), 'error');
      },
    },
  );
};
