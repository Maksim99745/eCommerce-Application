import { Cart } from '@commercetools/platform-sdk';
import { Button, ButtonProps, Container, Grid, Paper, Stack } from '@mui/material';
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
    <Button variant="contained" startIcon={<RemoveShoppingCartIcon />} {...props}>
      Clean cart
    </Button>
  );
}

export function CartToolBar({ cartData, isLoading, onCleanCart }: CartToolBarProps) {
  return (
    <Container maxWidth="md" sx={{ position: 'sticky', top: '0', zIndex: 1 }}>
      <Grid container>
        <Paper
          elevation={2}
          sx={{
            p: '1vh 2%',
            width: '100%',
            m: 1,
          }}
        >
          <Stack direction="row" justifyContent="space-between">
            <CartTotalCost cart={cartData} />

            <CleanCartDialog openControl={CleanCart} disabled={isLoading} onCleanCart={onCleanCart} />
          </Stack>
        </Paper>
      </Grid>
    </Container>
  );
}
