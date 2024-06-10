import { LineItem } from '@commercetools/platform-sdk';
import { Typography } from '@mui/material';

export function CartLineItemPrice({ cartItem }: { cartItem: LineItem }) {
  return (
    <>
      <Typography>Price: {cartItem.price.value.centAmount}</Typography>
      <Typography>Total price: {cartItem.totalPrice.centAmount}</Typography>
    </>
  );
}
