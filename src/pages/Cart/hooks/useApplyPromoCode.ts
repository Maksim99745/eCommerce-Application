import { createAppErrorMessage } from '@core/errorHandlers/createAppErrorMessage';
import { useShowMessage } from '@hooks/useShowMessage';
import { useEventCallback } from '@mui/material';
import { apiService } from '@core/api/api.service';
import { useCart } from '@hooks/useCart';
import { CartToolBarProps } from '../components/CartToolBar';

export const useApplyPromoCode = () => {
  const showMessage = useShowMessage();
  const { cart, setCart } = useCart();

  return useEventCallback<CartToolBarProps['onApplyPromoCode']>(async (promoCodeData) => {
    const requestData = {
      cart: cart ?? undefined,
      promoCode: promoCodeData.promoCode,
    };
    try {
      const newCart = await apiService.applyPromoCode(requestData);
      setCart(newCart);
      showMessage(`Promo code successfully applied`);
      return { success: true };
    } catch (error) {
      const errorMessage = createAppErrorMessage(error);
      showMessage(errorMessage, 'error');
      return { success: false, error: new Error(errorMessage) };
    }
  });
};
