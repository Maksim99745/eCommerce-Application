import { Cart } from '@commercetools/platform-sdk';
import { Button, ButtonProps, Grid, Paper, Stack } from '@mui/material';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { CartTotalCost } from './CartTotalCost';
import { CleanCartDialog } from './CleanCartDialog';

export type CartToolBarProps = {
  cartData: Cart;
  isLoading?: boolean;
  onCleanCart: () => void;
};

function CleanCart(props: ButtonProps) {
  return (
    <Button
      variant="contained"
      startIcon={<RemoveShoppingCartIcon sx={{ display: { xs: 'none', sm: 'block' } }} />}
      {...props}
    >
      Clean cart
    </Button>
  );
}

export function CartToolBar({ cartData, isLoading, onCleanCart }: CartToolBarProps) {
  return (
    <Grid container sx={{ position: 'sticky', top: '0', zIndex: 1, p: 0 }}>
      <Paper
        elevation={2}
        sx={{
          p: '1vh 2%',
          width: '100%',
          m: 1,
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <CartTotalCost cart={cartData} />
          <CleanCartDialog openControl={CleanCart} disabled={isLoading} onCleanCart={onCleanCart} />
        </Stack>
      </Paper>
    </Grid>
  );
}
