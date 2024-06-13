import { OperationResult } from '.';

export type RemoteOperationCallback<T> = (data: T) => Promise<OperationResult>;
