import { Cart } from '@commercetools/platform-sdk';
import { signal } from '@preact/signals-react';

export const cartSignal = signal<Cart | null | undefined>(undefined);
const isCartLoadingSignal = signal<boolean>(false);

export const setCartLoading = (isLoading: boolean) => {
  isCartLoadingSignal.value = isLoading;
};

export const setCart = (newCart: Cart | null | undefined) => {
  cartSignal.value = newCart;
  setCartLoading(false);
};

export const useCart = () => ({
  cart: cartSignal.value,
  isCartLoading: isCartLoadingSignal.value,
  setCart,
  setCartLoading,
});
