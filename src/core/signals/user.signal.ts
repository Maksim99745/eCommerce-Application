import { Customer } from '@commercetools/platform-sdk';
import { signal } from '@preact/signals-react';

export const userSignal = signal<Customer | null>(null);
export const userLoadingSignal = signal<boolean>(false);
