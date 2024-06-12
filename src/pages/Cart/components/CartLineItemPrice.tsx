import { LineItem } from '@commercetools/platform-sdk';
import { priceAmount, productCurrencyMap } from '@constants/products.const';
import { Stack, Typography } from '@mui/material';

export function CartLineItemPrice({ lineItem }: { lineItem: LineItem }) {
  const isMoreThanOneInTheCart = lineItem.quantity > 1;

  const pricePerItem = lineItem.price.discounted?.value.centAmount ?? lineItem.price.value.centAmount;

  const currencyCode = productCurrencyMap[lineItem.price.value.currencyCode];

  const pricePerItemContent = `Price per item: ${pricePerItem / priceAmount}${currencyCode}`;
  const totalPriceContent = `Price: ${lineItem.totalPrice.centAmount / priceAmount}${currencyCode}`;
  const isDiscounted = lineItem.price.discounted !== undefined;

  return (
    <>
      <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
        <Typography sx={{ fontSize: '17px', color: isDiscounted ? 'green' : 'black' }}>{totalPriceContent}</Typography>
        {isDiscounted && (
          <Typography
            aria-label="product-price"
            sx={{
              textDecoration: 'line-through',
              color: 'red',
            }}
          >
            {(lineItem.price.value.centAmount / priceAmount) * lineItem.quantity + currencyCode}
          </Typography>
        )}
      </Stack>
      <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
        <Typography sx={{ fontSize: '14px', color: isDiscounted ? 'green' : 'grey', minHeight: '1.5em' }}>
          {isMoreThanOneInTheCart && pricePerItemContent}
        </Typography>
        {isDiscounted && isMoreThanOneInTheCart && (
          <Typography
            aria-label="product-price"
            sx={{
              fontSize: '14px',
              textDecoration: 'line-through',
              color: 'red',
            }}
          >
            {lineItem.price.value.centAmount / priceAmount + currencyCode}
          </Typography>
        )}
      </Stack>
    </>
  );
}
