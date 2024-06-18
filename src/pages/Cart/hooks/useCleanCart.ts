import { createAppErrorMessage } from '@core/errorHandlers/createAppErrorMessage';
import { useShowMessage } from '@hooks/useShowMessage';
import { useEventCallback } from '@mui/material';
import { apiService } from '@core/api/api.service';
import { useCart } from '@hooks/useCart';
import { CartToolBarProps } from '../components/CartToolBar';

export const useCleanCart = () => {
  const showMessage = useShowMessage();
  const { cart, setCart, loadCart } = useCart();

  return useEventCallback<CartToolBarProps['onCleanCart']>(async () => {
    try {
      await apiService.cleanCart({ cart: cart ?? undefined });
      setCart(undefined);
      showMessage(`Cart is successfully cleaned`);
      return { success: true };
    } catch (error) {
      await loadCart();
      const errorMessage = createAppErrorMessage(error);
      showMessage(errorMessage, 'error');
      return { success: false, error: new Error(errorMessage) };
    }
  });
};
