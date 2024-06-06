import { Cart } from '@commercetools/platform-sdk';
import { Button, Stack, Typography } from '@mui/material';

export type CartProductsFormProps = {
  cartData: Cart;
  isCartLoading?: boolean;
};

export function CartProductsForm({ cartData, isCartLoading = false }: CartProductsFormProps) {
  const { lineItems } = cartData;
  // console.log(cartData);
  return (
    <Stack spacing={0} direction="column" sx={{ overflowX: 'auto' }}>
      {lineItems.map((cartItem) => (
        <Stack key={cartItem.id}>
          <Typography>{`${cartItem.name.en}`}</Typography>
          <Button disabled={isCartLoading}>Remove</Button>
        </Stack>
      ))}
    </Stack>
  );
}
