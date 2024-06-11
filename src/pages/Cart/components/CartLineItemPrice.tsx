import { LineItem } from '@commercetools/platform-sdk';
import { priceAmount, productCurrencyMap } from '@constants/products.const';
import { Typography } from '@mui/material';

export function CartLineItemPrice({ cartItem }: { cartItem: LineItem }) {
  const isMoreThanOneInTheCart = cartItem.quantity > 1;
  const pricePerItem = cartItem.price.discounted?.value.centAmount ?? cartItem.price.value.centAmount;
  const currencyCode = productCurrencyMap[cartItem.price.value.currencyCode];
  return (
    <>
      <Typography>
        Price: {cartItem.totalPrice.centAmount / priceAmount} {currencyCode}
      </Typography>
      {isMoreThanOneInTheCart && (
        <Typography sx={{ fontSize: '15px', color: 'grey' }}>
          Price per item: {pricePerItem / priceAmount}
          {currencyCode}
        </Typography>
      )}
    </>
  );
}
