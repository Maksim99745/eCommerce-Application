import { createAppErrorMessage } from '@core/errorHandlers/createAppErrorMessage';
import { useShowMessage } from '@hooks/useShowMessage';
import { useEventCallback } from '@mui/material';
import { apiService } from '@core/api/api.service';
import { useCart } from '@hooks/useCart';
import { CartProductsFormProps } from '../components/CartLineItemsView';

export const useRemoveCartLineItem = () => {
  const showMessage = useShowMessage();
  const { cart, setCart } = useCart();

  return useEventCallback<CartProductsFormProps['onLineItemRemove']>(async (lineItem) => {
    const productVariant = lineItem.variant?.attributes?.find((attr) => attr.name === 'color')?.value || '';

    try {
      const newCart = await apiService.removeCartLineItem({ lineItem, cart: cart ?? undefined });
      setCart(newCart);
      showMessage(`${lineItem.name.en} (${productVariant}) removed from your Cart 😢`);
      return { success: true };
    } catch (error) {
      const errorMessage = createAppErrorMessage(error);
      showMessage(errorMessage, 'error');
      return { success: false, error: new Error(errorMessage) };
    }
  });
};
