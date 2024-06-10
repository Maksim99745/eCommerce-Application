import { LineItem } from '@commercetools/platform-sdk';
import { Typography } from '@mui/material';

export function CartLineItemPrice({ cartItem }: { cartItem: LineItem }) {
  const isMoreThanOneInTheCart = cartItem.quantity > 1;

  return (
    <>
      <Typography>
        Price: {cartItem.totalPrice.centAmount} {cartItem.price.value.currencyCode}
      </Typography>
      {isMoreThanOneInTheCart && (
        <Typography sx={{ fontSize: '15px', color: 'grey' }}>
          Price per item: {cartItem.price.value.centAmount} {cartItem.price.value.currencyCode}
        </Typography>
      )}
    </>
  );
}
