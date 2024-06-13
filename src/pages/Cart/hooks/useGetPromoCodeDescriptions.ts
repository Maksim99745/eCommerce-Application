import { apiService } from '@core/api/api.service';
import { Cart, DiscountCode } from '@commercetools/platform-sdk';
import useSWR, { SWRResponse } from 'swr';

const getPromoCodeDescriptions = async ({ cart }: { cart: Cart }): Promise<DiscountCode[]> => {
  if (!cart?.discountCodes) {
    return [];
  }

  const promoCodeDescriptions = await Promise.all(
    cart.discountCodes.map(async (code) => {
      const promoCodeId = code.discountCode.id;
      return apiService.getPromoCodeDescription({ promoCodeId });
    }),
  );

  return promoCodeDescriptions;
};

export const useGetPromoCodeDescriptions = (cart: Cart): SWRResponse<DiscountCode[]> => {
  const fetcher = () => getPromoCodeDescriptions({ cart });
  return useSWR(cart ? ['promoCodeDescriptions', cart] : null, fetcher);
};
