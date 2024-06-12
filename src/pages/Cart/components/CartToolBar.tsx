import { Cart } from '@commercetools/platform-sdk';
import { Button, ButtonProps, Divider, Grid, Paper, Stack } from '@mui/material';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { OperationResult } from '@models/index';
import { CartPromoCodeFormData } from '@models/forms.model';
import { CartTotalCost } from './CartTotalCost';
import { CleanCartDialog } from './CleanCartDialog';
import { CartPromoCode } from './CartApplyPromoCode';

export type CartToolBarProps = {
  cartData: Cart;
  isLoading?: boolean;
  onCleanCart: () => void;
  onApplyPromoCode: (promoCodeData: CartPromoCodeFormData) => Promise<OperationResult>;
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

export function CartToolBar({ cartData, isLoading, onCleanCart, onApplyPromoCode }: CartToolBarProps) {
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
        <CartPromoCode onApplyPromoCode={onApplyPromoCode} disabled={isLoading} />
      </Paper>
    </Grid>
  );
}
