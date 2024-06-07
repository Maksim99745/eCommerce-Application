import { Cart, LineItem } from '@commercetools/platform-sdk';
import { Stack } from '@mui/material';
import { CartLineItem } from './CartLineItem';

export type CartProductsFormProps = {
  cartData: Cart;
  isLoading?: boolean;
  onLineItemRemove: (cartItem: LineItem) => void;
};

export function CartLineItemsView({ cartData, isLoading = false, onLineItemRemove }: CartProductsFormProps) {
  const { lineItems } = cartData;

  return (
    <Stack spacing={0} direction="column" sx={{ overflowX: 'auto' }}>
      {lineItems.map((cartItem) => (
        <CartLineItem cartItem={cartItem} key={cartItem.id} disabled={isLoading} onRemove={onLineItemRemove} />
      ))}
    </Stack>
  );
}
