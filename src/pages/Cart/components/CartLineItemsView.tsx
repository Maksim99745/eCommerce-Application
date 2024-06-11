import { Cart, LineItem } from '@commercetools/platform-sdk';
import { Stack } from '@mui/material';
import { CartLineItem } from './CartLineItem';
import { EmptyCartMessage } from './EmptyCartMessage';

export type CartProductsFormProps = {
  cartData: Cart;
  isLoading?: boolean;
  onLineItemRemove: (cartItem: LineItem) => void;
};

export function CartLineItemsView({ cartData, isLoading = false, onLineItemRemove }: CartProductsFormProps) {
  const { lineItems } = cartData;
  const isEmptyCart = cartData.lineItems.length === 0;

  return (
    <Stack direction="column">
      {lineItems.map((cartItem) => (
        <CartLineItem cartItem={cartItem} key={cartItem.id} disabled={isLoading} onRemove={onLineItemRemove} />
      ))}
      {isEmptyCart && <EmptyCartMessage />}
    </Stack>
  );
}
