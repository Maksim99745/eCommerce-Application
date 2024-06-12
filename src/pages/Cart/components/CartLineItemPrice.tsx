import { LineItem } from '@commercetools/platform-sdk';
import { priceAmount, productCurrencyMap } from '@constants/products.const';
import { Typography } from '@mui/material';

export function CartLineItemPrice({ lineItem }: { lineItem: LineItem }) {
  const isMoreThanOneInTheCart = lineItem.quantity > 1;

  const pricePerItem = lineItem.price.discounted?.value.centAmount ?? lineItem.price.value.centAmount;

  const currencyCode = productCurrencyMap[lineItem.price.value.currencyCode];

  const pricePerItemContent = `Price per item: ${pricePerItem / priceAmount}${currencyCode}`;
  const totalPriceContent = `Price: ${lineItem.totalPrice.centAmount / priceAmount}${currencyCode}`;
  return (
    <>
      <Typography sx={{ fontSize: '17px' }}>{totalPriceContent}</Typography>
      <Typography sx={{ fontSize: '14px', color: 'grey', minHeight: '1.5em' }}>
        {isMoreThanOneInTheCart && pricePerItemContent}
      </Typography>
    </>
  );
}
