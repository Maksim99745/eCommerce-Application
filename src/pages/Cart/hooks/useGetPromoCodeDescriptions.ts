import { apiService } from '@core/api/api.service';
import { Cart, DiscountCode } from '@commercetools/platform-sdk';
import useSWR, { SWRResponse } from 'swr';
import { createAppErrorMessage } from '@core/errorHandlers/createAppErrorMessage';
import { useShowMessage } from '@hooks/useShowMessage';

const useFetchPromoCodeDescriptions = async ({ cart }: { cart: Cart }): Promise<DiscountCode[]> => {
  const showMessage = useShowMessage();
  if (!cart?.discountCodes) {
    return [];
  }

  try {
    const promoCodeDescriptions = await Promise.all(
      cart.discountCodes.map(async (code) => {
        const promoCodeId = code.discountCode.id;
        return apiService.getPromoCodeDescription({ promoCodeId });
      }),
    );

    return promoCodeDescriptions;
  } catch (error) {
    const errorMessage = createAppErrorMessage(error);
    showMessage(errorMessage, 'error');
    return [];
  }
};

export const useGetPromoCodeDescriptions = ({ cart }: { cart: Cart }): SWRResponse<DiscountCode[]> => {
  const fetcher = useFetchPromoCodeDescriptions({ cart });
  return useSWR(cart ? ['promoCodeDescriptions', cart] : null, () => fetcher);
};
