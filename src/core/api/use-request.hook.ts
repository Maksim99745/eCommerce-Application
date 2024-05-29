import useSWR, { Key, SWRResponse } from 'swr';

export const useRequest = <T>(key: Key, request: () => Promise<T>): SWRResponse<T> => useSWR(key, request);
