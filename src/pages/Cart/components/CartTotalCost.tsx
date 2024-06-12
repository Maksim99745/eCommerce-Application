import { Cart } from '@commercetools/platform-sdk';
import { priceAmount, productCurrencyMap } from '@constants/products.const';
import { Typography } from '@mui/material';

export function CartTotalCost({ cart }: { cart: Cart }) {
  const currencyCode = productCurrencyMap[cart.lineItems[0].price.value.currencyCode];

  const totalCostContent = `Total price: ${cart.totalPrice.centAmount / priceAmount}${currencyCode}`;

  return <Typography variant="h6">{totalCostContent}</Typography>;
}
