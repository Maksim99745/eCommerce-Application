import { Cart } from '@commercetools/platform-sdk';
import { apiService } from '@core/api/api.service';
import { signal } from '@preact/signals-react';

const cartSignal = signal<Cart | null | undefined>(undefined);
const isCartLoadingSignal = signal<boolean>(false);

export const setCartLoading = (isLoading: boolean) => {
  isCartLoadingSignal.value = isLoading;
};

export const setCart = (newCart: Cart | null | undefined) => {
  cartSignal.value = newCart;
  setCartLoading(false);
};

export const loadCart = async () => {
  setCartLoading(true);
  setCart(await apiService.getCarts().then((carts) => carts.results[0]));
};

export const useCart = () => ({
  cart: cartSignal.value,
  isCartLoading: isCartLoadingSignal.value,
  setCart,
  setCartLoading,
  loadCart,
});
