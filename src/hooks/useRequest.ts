import useSWR, { Key, SWRResponse } from 'swr';

// TODO: Remove after moving all requests to hooks
export const useRequest = <T>(key: Key, request: () => Promise<T>): SWRResponse<T> => useSWR(key, request);
