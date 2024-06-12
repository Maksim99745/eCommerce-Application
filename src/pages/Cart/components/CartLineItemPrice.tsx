import { LineItem } from '@commercetools/platform-sdk';
import { priceAmount, productCurrencyMap } from '@constants/products.const';
import { Typography } from '@mui/material';

export function CartLineItemPrice({ lineItem }: { lineItem: LineItem }) {
  const isMoreThanOneInTheCart = lineItem.quantity > 1;
  const pricePerItem = lineItem.price.discounted?.value.centAmount ?? lineItem.price.value.centAmount;
  const currencyCode = productCurrencyMap[lineItem.price.value.currencyCode];
  return (
    <>
      <Typography>
        Price: {lineItem.totalPrice.centAmount / priceAmount} {currencyCode}
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
