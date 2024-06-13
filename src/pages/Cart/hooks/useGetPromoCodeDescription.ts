import { createAppErrorMessage } from '@core/errorHandlers/createAppErrorMessage';
import { useEventCallback } from '@mui/material';
import { apiService } from '@core/api/api.service';
import { useCart } from '@hooks/useCart';
import { DiscountCode } from '@commercetools/platform-sdk';
import { useShowMessage } from '@hooks/useShowMessage';
import { CartToolBarProps } from '../components/CartToolBar';

export const useGetPromoCodeDescription = () => {
  const showMessage = useShowMessage();
  const { cart } = useCart();

  return useEventCallback<CartToolBarProps['onGetPromoCodeDescriptions']>(async () => {
    try {
      const promoCodeDescriptions: DiscountCode[] = [];
      cart?.discountCodes.forEach(async (code) => {
        const promoCodeId = code.discountCode.id;
        const codeDescription = await apiService.getPromoCodeDescription({ promoCodeId });
        promoCodeDescriptions.push(codeDescription);
      });
      return promoCodeDescriptions;
    } catch (error) {
      const errorMessage = createAppErrorMessage(error);
      showMessage(errorMessage, 'error');
      return [];
    }
  });
};
