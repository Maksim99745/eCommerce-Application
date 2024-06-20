import { apiService } from '@core/api/api.service';
import useSWR from 'swr';

export const useGetAvailablePromoCodes = () => useSWR('availablePromoCodes', () => apiService.getAvailablePromoCodes());
