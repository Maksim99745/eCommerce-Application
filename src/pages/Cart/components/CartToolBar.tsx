import { Cart } from '@commercetools/platform-sdk';
import { Button, ButtonProps, Divider, Grid, Paper, Stack } from '@mui/material';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { useShowMessage } from '@hooks/useShowMessage';
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
  const showMessage = useShowMessage();

  const getPromoCode = (): void => {
    const promoCodes = ['RS5', 'RS10'];
    const promoCode = promoCodes[Math.floor(Math.random() * promoCodes.length)];
    showMessage(`Congratulations, your promo-code is ${promoCode}`);
  };

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
        <Divider sx={{ m: 1 }} />
        <Grid container columns={12} direction="row" justifyContent="space-between" alignItems="center">
          <Grid item xs={5}>
            <Button size="small" onClick={() => getPromoCode()}>
              Get promo code!
            </Button>
          </Grid>
          <Grid item xs={7}>
            s
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}
