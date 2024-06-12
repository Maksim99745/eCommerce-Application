import { Cart } from '@commercetools/platform-sdk';
import { priceAmount, productCurrencyMap } from '@constants/products.const';
import { Stack, Typography } from '@mui/material';

export function CartTotalCost({ cart }: { cart: Cart }) {
  const currencyCode = productCurrencyMap[cart.lineItems[0].price.value.currencyCode];
  const isDiscounted = cart.discountOnTotalPrice !== undefined;
  const discountedAmount = cart.discountOnTotalPrice?.discountedAmount?.centAmount ?? 0;

  const totalCostContent = `Total price: ${cart.totalPrice.centAmount / priceAmount}${currencyCode}`;
  const oldTotalCostContent = (cart.totalPrice.centAmount + discountedAmount) / priceAmount + currencyCode;
  return (
    <Stack direction="row" sx={{ gap: 1 }}>
      <Typography variant="h6" sx={{ color: isDiscounted ? 'green' : 'black' }}>
        {totalCostContent}
      </Typography>
      {isDiscounted && (
        <Typography
          variant="h6"
          sx={{
            textDecoration: 'line-through',
            color: 'red',
          }}
        >
          {oldTotalCostContent}
        </Typography>
      )}
    </Stack>
  );
}
