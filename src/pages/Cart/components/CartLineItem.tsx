import { LineItem } from '@commercetools/platform-sdk';
import { Button, Stack, Typography } from '@mui/material';

interface CartLineItemProps {
  cartItem: LineItem;
  disabled?: boolean;
  onRemove: (cartItem: LineItem) => void;
}

export function CartLineItem({ cartItem, disabled = false, onRemove }: CartLineItemProps) {
  return (
    <Stack key={cartItem.id} direction="row">
      <Typography>{`${cartItem.name.en}`}</Typography>
      <Typography>&nbsp; {`amount: ${cartItem.quantity}`}</Typography>
      <Button disabled={disabled} onClick={() => onRemove(cartItem)}>
        Remove
      </Button>
    </Stack>
  );
}
