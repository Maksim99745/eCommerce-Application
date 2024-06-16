import { apiService } from '@core/api/api.service';
import useSWR from 'swr';

export const useGetActivePromoCodeDescription = ({ promoCodeId }: { promoCodeId: string }) =>
  useSWR(promoCodeId, () =>
    apiService.getPromoCodeDescription({
      promoCodeId,
    }),
  );
