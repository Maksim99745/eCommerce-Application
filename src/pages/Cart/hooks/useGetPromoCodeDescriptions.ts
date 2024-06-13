import { apiService } from '@core/api/api.service';
import useSWR from 'swr';

export const useFetchPromoCodeDescriptions = (promoCodeId: string) =>
  useSWR(promoCodeId, () =>
    apiService.getPromoCodeDescription({
      promoCodeId,
    }),
  );
